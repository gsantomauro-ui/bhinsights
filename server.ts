import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";

const PORT = parseInt(process.env.PORT || "3000", 10);
const PROJECT_ID = "gen-lang-client-0336755079";
const DATABASE_ID = "ai-studio-9248aafc-b8ba-4e8b-b34a-32d6b30565e6";

async function getArticleMetadata(slug: string) {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents:runQuery`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: "articles" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "slug" },
              op: "EQUAL",
              value: { stringValue: slug },
            },
          },
          limit: 1,
        },
      }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    if (!data || data.length === 0 || !data[0].document) return null;

    const fields = data[0].document.fields;
    return {
      title: fields.title?.stringValue || "",
      excerpt: fields.excerpt?.stringValue || "",
      imageUrl: fields.imageUrl?.stringValue || "",
    };
  } catch (error) {
    console.error("Error fetching article metadata:", error);
    return null;
  }
}

async function startServer() {
  const app = express();

  let vite: any;
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from dist/client or dist (depending on vite config)
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));
  }

  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *\nAllow: /\n\nSitemap: https://bhinsights.es/sitemap.xml`);
  });

  app.get("/sitemap.xml", async (req, res) => {
    try {
      const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents:runQuery`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: "articles" }],
            select: { fields: [{ fieldPath: "slug" }] },
          },
        }),
      });

      let urls = `<url><loc>https://bhinsights.es/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`;
      
      const categories = ['novedades', 'lanzamientos', 'mercado', 'healthtech', 'educacion', 'trabajo'];
      for (const cat of categories) {
          urls += `\n<url><loc>https://bhinsights.es/categoria/${cat}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`;
      }

      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          for (const item of data) {
            if (item.document && item.document.fields && item.document.fields.slug) {
              const slug = item.document.fields.slug.stringValue;
              urls += `\n<url><loc>https://bhinsights.es/articulo/${slug}</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`;
            }
          }
        }
      }

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

      res.header("Content-Type", "application/xml");
      res.send(sitemap);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  app.get("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;
      let templateStr = "";

      if (!isProd) {
        templateStr = await fs.readFile(path.join(process.cwd(), "index.html"), "utf-8");
        templateStr = await vite.transformIndexHtml(url, templateStr);
      } else {
        templateStr = await fs.readFile(path.join(process.cwd(), "dist", "index.html"), "utf-8");
      }

      // Intercept /articulo/:slug
      const articleMatch = url.match(/^\/articulo\/([^/?]+)/);
      if (articleMatch) {
        const slug = articleMatch[1];
        const metadata = await getArticleMetadata(slug);

        if (metadata) {
          const fullUrl = `https://bhinsights.es${url}`;
          const fullTitle = `${metadata.title} | BH Insights`;
          const metaTags = `
            <title>${fullTitle}</title>
            <meta name="description" content="${metadata.excerpt.replace(/"/g, '&quot;')}" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content="${fullTitle.replace(/"/g, '&quot;')}" />
            <meta property="og:description" content="${metadata.excerpt.replace(/"/g, '&quot;')}" />
            <meta property="og:image" content="${metadata.imageUrl}" />
            <meta property="og:url" content="${fullUrl}" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="${fullTitle.replace(/"/g, '&quot;')}" />
            <meta property="twitter:description" content="${metadata.excerpt.replace(/"/g, '&quot;')}" />
            <meta property="twitter:image" content="${metadata.imageUrl}" />
          `;
          
          templateStr = templateStr.replace(/<title>.*?<\/title>/, '');
          templateStr = templateStr.replace(/<meta name="description".*?>/, '');
          templateStr = templateStr.replace(/<meta property="og:.*?".*?>/g, '');
          templateStr = templateStr.replace(/<meta property="twitter:.*?".*?>/g, '');
          templateStr = templateStr.replace("<!-- SEO_INJECT -->", metaTags);
          // If no placeholder, insert before </head>
          if (!templateStr.includes(metaTags)) {
             templateStr = templateStr.replace("</head>", `${metaTags}</head>`);
          }
        }
      }

      res.status(200).set({ "Content-Type": "text/html" }).end(templateStr);
    } catch (e) {
      if (e instanceof Error) {
        vite?.ssrFixStacktrace(e);
        next(e);
      } else {
        next(e);
      }
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
