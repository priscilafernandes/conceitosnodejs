const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');
const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { 
    id: uuid(), 
    title, 
    url, 
    techs, 
    likes: 0
  };

  repositories.push(repository);
  
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => {
    return repository.id === id;
  });
  
  const repository = repositories[repositoryIndex];

  if (repositoryIndex != -1) {
    repository.title = title;
    repository.url = url;
    repository.techs = techs;
  } else {
    response.status(400).json({
      error: 'Repository not found' 
    });
  };

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => {
    return repository.id === id;
  });

  if (repositoryIndex != -1) {
    repositories.splice(repositoryIndex, 1);
  } else {
    response.status(400).json({
      error: 'Repository not found' 
    });
  };

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => {
    return repository.id === id;
  });
  
  const repository = repositories[repositoryIndex];

  if (repositoryIndex != -1) {
    repository.likes++;
  } else {
    response.status(400).json({
      error: 'Repository not found' 
    });
  };

  return response.json(repository);
});

module.exports = app;
