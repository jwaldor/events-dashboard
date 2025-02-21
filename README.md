## Usage

1. **Adding URLs**

   - Navigate to the URL Manager page
   - Enter URLs (one per line) in the text area
   - Click "Add" to begin scraping events

2. **Viewing Events**
   - Click "View Events" to see all scraped events

## Project Structure

- `/src/app` - Next.js pages and API routes
- `/src/components` - React components
- `/src/services` - Business logic and database operations
- `/src/utils` - Helper functions and AI integration

## API Routes

- `POST /api/urls` - Add new URLs for scraping
- `GET /api/urls` - Get all tracked URLs
- `DELETE /api/urls` - Remove a URL from tracking
- `GET /api/events` - Get all scraped events
- `GET /api/eventCron` - Trigger event update via scraping the tracked URLs

## License

[MIT License](LICENSE)
