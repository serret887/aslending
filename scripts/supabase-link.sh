#!/bin/bash

# Get the Supabase project ID from config.toml
PROJECT_ID=$(grep "project_id" supabase/config.toml | cut -d'"' -f2)

# Link the project
supabase link --project-ref "$PROJECT_ID"

# Generate types
supabase gen types typescript --local > src/types/supabase.ts 