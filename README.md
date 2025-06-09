# Real Madrid Squad

This repository contains the source code for a sample project that manages a list of Real Madrid players. The project is divided into three modules:

1. **Node server** – exposes an API for player data.
2. **React client** – front‑end web application that consumes the API.
3. **MCP server** – a back‑end component that can proxy or otherwise extend the API.

## Getting started

Clone the repository and install the dependencies for each module:

```bash
# install server dependencies
cd server
npm install

# install client dependencies
cd ../client
npm install

# install MCP server dependencies
cd ../mcp
npm install
```

## Running each module

Use the following commands from the repository root:

```bash
# start the Node server
npm --prefix server start

# start the React client (Vite dev server)
npm --prefix client run dev

# start the MCP server
npm --prefix mcp start
```

## Tests

Each module may provide its own test script. Run them with:

```bash
npm --prefix server test
npm --prefix client test
npm --prefix mcp test
```

Some tests may require environment variables (for example, database or API credentials). Refer to the documentation within each module for details on any variables that must be set.

