# PRISM Website

A modern, responsive website for the PRISM (Precision Relocation via Intelligent Slide Manipulation) robotics project.

## Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Smooth Animations**: Fade-in effects, smooth scrolling, and interactive hover states
- **Modern UI**: Clean, professional design with gradient accents and card-based layouts
- **Interactive Navigation**: Auto-hiding navbar with active section highlighting
- **Mobile Menu**: Hamburger menu for mobile devices

## File Structure

```
prism-website/
├── index.html      # Main HTML file
├── style.css       # All styling and animations
├── script.js       # Interactive features and animations
└── README.md       # This file
```

## How to Use

1. **Open the website**: Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)

2. **Navigate**: Click on the navigation links at the top to jump to different sections

3. **Explore**: Scroll through the page to see all the project details with smooth animations

## Sections

- **Home**: Hero section with project title and overview
- **Overview**: Problem statement and project goals
- **Perception**: Computer vision approaches (ArUco Markers and G-SAM)
- **Planning**: Motion planning with MoveIt2
- **Actuation**: Custom gripper and hardware setup
- **System**: Complete system architecture
- **Team**: Team members and acknowledgments

## Customization

### Changing Colors

Edit the CSS variables in `style.css`:

```css
:root {
    --primary-color: #00d4ff;    /* Main accent color */
    --secondary-color: #6c63ff;  /* Secondary accent */
    --accent-color: #ff6b6b;     /* Warning/error color */
    /* ... other colors */
}
```

### Adding Images

To add images to the website:

1. Create an `images/` folder in the same directory
2. Add your images to that folder
3. Insert images in `index.html` using:
   ```html
   <img src="images/your-image.jpg" alt="Description">
   ```

### Adding a Demo Video

To embed a demo video, replace the "Demo Video" section in `index.html` with:

```html
<div class="video-container">
    <iframe width="100%" height="500" src="YOUR_VIDEO_URL" frameborder="0" allowfullscreen></iframe>
</div>
```

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Credits

**Team 45 - EECS/ME 206A**
- David Chen
- Ryan Chung
- Yu-Wei Chang
- Bryan Chang
- Kain Hung

**Industry Sponsor**: Ember Robotics

---

For questions or modifications, contact the team members listed above.
