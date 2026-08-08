#!/bin/bash
TEMPLATE_NAME=$1
PROJECT_NAME=$2
if [ -z "$TEMPLATE_NAME" ] || [ -z "$PROJECT_NAME" ]; then
  echo "Usage: ./scripts/new-project.sh <template-name> <project-name>"
  echo "Example: ./scripts/new-project.sh nextjs-fullstack my-hackathon-2026"
  exit 1
fi
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
SOURCE_DIR="$REPO_ROOT/templates/$TEMPLATE_NAME"
DEST_DIR="$REPO_ROOT/../$PROJECT_NAME"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: template '$TEMPLATE_NAME' not found at $SOURCE_DIR"
  exit 1
fi

if [ -d "$DEST_DIR" ]; then
  echo "Error: a folder named '$PROJECT_NAME' already exists at $DEST_DIR"
  exit 1
fi

echo "Copying template '$TEMPLATE_NAME' to '$PROJECT_NAME'..."
cp -r "$SOURCE_DIR" "$DEST_DIR"
rm -rf "$DEST_DIR/node_modules" "$DEST_DIR/.next"

if [ -f "$DEST_DIR/.env.example" ]; then
  cp "$DEST_DIR/.env.example" "$DEST_DIR/.env.local"
  echo "Created .env.local — remember to fill in your Supabase keys"
fi

echo "Installing dependencies..."
cd "$DEST_DIR"
npm install

echo ""
echo "✅ Project '$PROJECT_NAME' is ready at $DEST_DIR"
echo ""
echo "Next steps:"
echo "1. cd ../$PROJECT_NAME"
echo "2. Open .env.local and add your Supabase project URL + anon key"
echo "3. npm run dev"