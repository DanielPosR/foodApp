import { createServer } from 'http';
import { readFile, writeFile } from 'fs';
import { parse } from 'url';

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS'); // Permitir los métodos GET, POST, DELETE, OPTIONS
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Permitir el encabezado Content-Type

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = parse(req.url, true);
  const path = parsedUrl.pathname;

  if (path === '/recetas' && req.method === 'GET') {
    readFile('recetas.json', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error interno del servidor' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  } else if (path === '/recetas' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const nuevaReceta = JSON.parse(body);
      readFile('recetas.json', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Error interno del servidor' }));
          return;
        }
        const recetas = JSON.parse(data);
        nuevaReceta.id = recetas.recetas.length ? recetas.recetas[recetas.recetas.length - 1].id + 1 : 1;
        recetas.recetas.push(nuevaReceta);
        writeFile('recetas.json', JSON.stringify(recetas), (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error interno del servidor' }));
            return;
          }
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(nuevaReceta));
        });
      });
    });
  } else if (path.startsWith('/recetas/') && req.method === 'DELETE') {
    const id = parseInt(path.split('/')[2]);
    readFile('recetas.json', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error interno del servidor' }));
        return;
      }
      const recetas = JSON.parse(data);
      const index = recetas.recetas.findIndex(receta => receta.id === id);
      if (index === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Receta no encontrada' }));
        return;
      }
      recetas.recetas.splice(index, 1);
      writeFile('recetas.json', JSON.stringify(recetas), (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Error interno del servidor' }));
          return;
        }
        res.writeHead(204);
        res.end();
      });
    });
  } else if (path.startsWith('/recetas/') && req.method === 'PUT') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const updatedReceta = JSON.parse(body);
      readFile('recetas.json', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Error interno del servidor' }));
          return;
        }
        const recetas = JSON.parse(data);
        const index = recetas.recetas.findIndex(receta => receta.id === updatedReceta.id);
        if (index === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Receta no encontrada' }));
          return;
        }
        recetas.recetas[index] = updatedReceta;
        writeFile('recetas.json', JSON.stringify(recetas), err => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error interno del servidor' }));
            return;
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updatedReceta));
        });
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});