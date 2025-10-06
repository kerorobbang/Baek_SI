# Research Homepage

A modern, responsive personal homepage for researchers built with HTML, CSS, and JavaScript. This template is designed specifically for academics and researchers to showcase their work, publications, and professional achievements.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Publication Management**: 
  - Year-based filtering
  - Search functionality
  - Impact Factor (IF) and JCR ranking display
  - Citation counts
  - DOI links
  - Abstract viewing
- **Research Showcase**: Highlight current projects, grants, and collaborations
- **Contact Integration**: Multiple ways to get in touch
- **Social Links**: ORCID, Google Scholar, GitHub, LinkedIn, Twitter
- **Statistics Dashboard**: Publication counts, citations, H-index
- **GitHub Pages Ready**: Easy deployment to GitHub Pages

## Quick Start

1. **Fork or Clone this repository**
   ```bash
   git clone https://github.com/yourusername/yourusername.github.io.git
   cd yourusername.github.io
   ```

2. **Customize your information**
   - Edit `index.html` to update your personal information
   - Modify `publications.html` to add your publications
   - Update `_config.yml` with your details
   - Replace `assets/images/profile.jpg` with your photo

3. **Deploy to GitHub Pages**
   - Push your changes to the `main` branch
   - Go to Settings > Pages in your GitHub repository
   - Select "Deploy from a branch" and choose `main`
   - Your site will be available at `https://yourusername.github.io`

## Customization Guide

### Personal Information

1. **Update `index.html`**:
   - Replace `[Your Name]` with your actual name
   - Update research interests in the About section
   - Modify contact information
   - Update social media links

2. **Update `publications.html`**:
   - Add your publications to the `publicationData` array in `assets/js/publications.js`
   - Include Impact Factor, JCR ranking, and citation information
   - Add abstracts and DOI links

3. **Update `_config.yml`**:
   - Change site title and description
   - Update social links
   - Modify research interests
   - Add education and awards information

### Adding Publications

To add a new publication, edit the `publicationData` array in `assets/js/publications.js`:

```javascript
{
    id: 5,
    year: 2024,
    type: 'journal', // 'journal', 'conference', 'book', 'patent'
    title: 'Your Publication Title',
    authors: 'Your Name, Co-author 1, Co-author 2',
    journal: 'Journal Name, Volume(Issue), Pages',
    if: 5.2, // Impact Factor (null if not applicable)
    jcr: 'Q1', // JCR ranking (null if not applicable)
    citations: 15,
    doi: '10.1000/example.doi',
    abstract: 'Your abstract text...'
}
```

### Styling

- **Colors**: Modify CSS variables in `assets/css/style.css`
- **Fonts**: Change the Google Fonts import in the HTML files
- **Layout**: Adjust grid layouts and spacing in the CSS files

### Images

- **Profile Photo**: Replace `assets/images/profile.jpg` with your photo (recommended size: 300x300px)
- **Favicon**: Add `favicon.ico` to the root directory

## File Structure

```
├── index.html              # Main homepage
├── publications.html       # Publications page
├── _config.yml            # Jekyll configuration
├── README.md              # This file
├── assets/
│   ├── css/
│   │   ├── style.css      # Main stylesheet
│   │   └── publications.css # Publications page styles
│   ├── js/
│   │   ├── script.js      # Main JavaScript
│   │   └── publications.js # Publications page JavaScript
│   └── images/
│       └── profile.jpg    # Your profile photo
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Optimized CSS and JavaScript
- Lazy loading for images
- Minimal external dependencies
- Fast loading times

## Contributing

Feel free to submit issues and enhancement requests! This template is designed to be easily customizable and extensible.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Jekyll for static site generation
- GitHub Pages for hosting

## Support

If you have any questions or need help customizing this template, please open an issue on GitHub.

---

**Happy researching!** 🔬📚
