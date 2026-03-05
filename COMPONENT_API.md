# 📚 Component API Documentation

## Component Reference Guide

---

## 🪔 **LanternIntro**

**File**: `src/components/LanternIntro.js`

### Purpose
Displays an interactive lantern that triggers the invitation reveal on click or scroll.

### Props
```javascript
{
  onEnter: function // Called when lantern is clicked/scrolled
}
```

### State
```javascript
{
  isClicked: boolean,      // Tracks if lantern was clicked
  imageLoaded: boolean     // Tracks if lantern image loaded
}
```

### Features
- Click detection
- Scroll detection (50px threshold)
- Web Audio API bell chime sound
- Image loading with emoji fallback
- Sway animation
- Breathing glow effect
- Smooth transition to next screen

### Usage
```javascript
<LanternIntro onEnter={() => setShowInvite(true)} />
```

### Styling Classes
- `.lantern-screen` - Container
- `.lantern-wrapper` - Wrapper
- `.lantern-image-wrapper` - Image container
- `.lantern-glow` - Glow effect
- `.lantern-image` - Image element

---

## 🎭 **CurtainReveal**

**File**: `src/components/CurtainReveal.js`

### Purpose
Displays elegant curtains that open from left and right after lantern reveal.

### Props
```javascript
{
  isVisible: boolean,              // Show/hide curtains
  onAnimationComplete: function    // Callback when animation finishes
}
```

### Features
- Left curtain slide animation
- Right curtain slide animation
- Cubic-bezier easing for smoothness
- Backdrop blur effect
- Automatic cleanup

### Usage
```javascript
<CurtainReveal 
  isVisible={showCurtain} 
  onAnimationComplete={() => setShowCurtain(false)} 
/>
```

### Styling Classes
- `.curtain-container` - Container
- `.curtain` - Base curtain style
- `.curtain-left` - Left curtain animation
- `.curtain-right` - Right curtain animation

### Animations
- `curtain-open-left`: 1.5s ease-out
- `curtain-open-right`: 1.5s ease-out

---

## ☽ **CrescentMoon**

**File**: `src/components/CrescentMoon.js`

### Purpose
Interactive crescent moon in top-right corner with sparkle effects and easter egg.

### Props
None (standalone component)

### State
```javascript
{
  clicks: number,          // Click count (0-3)
  sparkles: array,         // Active sparkle objects
  showMessage: boolean     // Show easter egg message
}
```

### Features
- Click detection
- Sparkle generation (8 per click)
- Easter egg at 3 clicks
- Glow animation
- Hover effects
- Message auto-dismiss (3s)
- Responsive positioning

### Usage
```javascript
<CrescentMoon />
```

### Easter Egg
Click the moon 3 times to see:
> "Ramzan evenings are better with friends like you."

### Styling Classes
- `.crescent-moon-container` - Container
- `.crescent-moon` - Moon emoji
- `.sparkle` - Sparkle animation
- `.easter-egg-message` - Message display

### Animations
- `moon-glow`: 3s infinite breathing
- `sparkle-float`: 0.8s radial motion
- `message-fade`: 3s fade in/out

---

## 🍲 **FoodSelection**

**File**: `src/components/FoodSelection.js`

### Purpose
Stylized food selection interface with visual feedback for selected items.

### Props
```javascript
{
  selectedItems: string[],         // Array of selected item IDs
  onChange: function(items: array) // Callback when selection changes
}
```

### Features
- 5 food items with emoji icons
- Click to select/deselect
- Visual highlight on selection
- Gold border and checkmark badge
- Hover elevation effect
- Keyboard accessible
- Responsive grid layout
- Full accessibility support

### Available Items
1. `biryani` - 🍚 Biryani
2. `haleem` - 🍲 Haleem
3. `chaat` - 🥗 Fruit Chaat
4. `sharbat` - 🧃 Sharbat
5. `dessert` - 🍰 Dessert

### Usage
```javascript
const [selectedFoods, setSelectedFoods] = useState([]);

<FoodSelection 
  selectedItems={selectedFoods} 
  onChange={setSelectedFoods}
/>
```

### Styling Classes
- `.food-selection` - Container
- `.food-grid` - Grid layout
- `.food-item` - Individual item
- `.food-item.selected` - Selected state
- `.food-icon` - Icon element
- `.food-label` - Label text

### Keyboard Support
- **Tab**: Navigate between items
- **Enter/Space**: Toggle selection
- **Hover**: Visual feedback

---

## ⏱️ **CountdownTimerEnhanced**

**File**: `src/components/CountdownTimerEnhanced.js`

### Purpose
Elegant countdown timer with glowing lantern animation.

### Props
None (renders independently)

### State
```javascript
{
  timeLeft: {
    days: number,      // Days remaining
    hours: number,     // Hours remaining (0-23)
    minutes: number,   // Minutes remaining (0-59)
    seconds: number    // Seconds remaining (0-59)
  }
}
```

### Features
- Real-time countdown updates
- Glowing lantern emoji (🪔)
- Breathing lantern animation
- Responsive grid layout
- Proper zero-padding (HH:MM:SS format)
- Automatic calculation
- Efficient interval management

### Target Date
```
March 15, 2026 @ 6:25 PM UTC
```

### Usage
```javascript
<CountdownTimerEnhanced />
```

### Styling Classes
- `.countdown-enhanced` - Container
- `.countdown-header` - Header with lantern
- `.lantern-icon` - Glowing lantern emoji
- `.countdown-container` - Timer display
- `.countdown-item` - Individual unit (days/hours/minutes/seconds)
- `.countdown-value` - Numerical value
- `.countdown-unit` - Unit label
- `.countdown-separator` - Colon separator

### Animations
- `lantern-glow`: 2.5s infinite breathing effect

### Update Frequency
- Every 1000ms (1 second)

---

## 🎨 **GlitterCanvas** (Enhanced)

**File**: `src/components/GlitterCanvas.js`

### Purpose
Canvas-based particle system for golden glitter animation.

### Props
None (renders independently)

### Features
- 220 golden particles
- 60 static sparkles
- Continuous animation loop
- Hardware accelerated (canvas)
- Responsive to window resize
- Auto cleanup on unmount

### Particle System
```javascript
Particles: 220
- Spawn: Bottom of screen (H to H+40px)
- Velocity: (-0.4 to 0.4) X, (-2.5 to -1.5) Y
- Shapes: 50% stars, 50% circles
- Colors: 5 gold variations
- Fade: 0.002-0.005 per frame
- Rotation: Random angular velocity
```

### Sparkle System
```javascript
Sparkles: 60
- Position: Random across canvas
- Type: Cross-shaped glitter
- Animation: Sine wave pulsing
- Colors: Gold variations
```

### Usage
```javascript
<GlitterCanvas />
```

### Styling
```javascript
position: fixed
inset: 0
pointerEvents: none
zIndex: 3
```

---

## 📝 **App** (Main Component)

**File**: `src/App.js`

### State Management
```javascript
{
  showInvite: boolean,           // Main flow control
  showCurtain: boolean,          // Curtain visibility
  selectedFoods: string[],       // Selected food items
  formData: {
    drink: string,
    starters: string[],
    main: string,
    dessert: string,
    attending: string,
    name: string,
    contact: string,
    notes: string,
    dietaryRestrictions: string
  },
  submitted: boolean,            // Form submission state
  summaryText: string            // RSVP summary
}
```

### Main Flow
```
1. showInvite = false → LanternIntro
2. Click/scroll lantern → showCurtain = true
3. Curtains open → showInvite = true
4. ScrollablePage renders
5. Fill form → submitted = true
6. ResultSummary displays
```

### Event Handlers
- `handleDrinkChange(e)` - Update drink selection
- `handleStarterChange(e)` - Update starters (max 2)
- `handleMainChange(e)` - Update main course
- `handleDessertChange(e)` - Update dessert
- `handleAttendingChange(e)` - Update attendance
- `handleInputChange(e)` - Update form fields
- `handleSubmit(e)` - Validate and submit RSVP
- `handleReset()` - Reset form to initial state

### Validation Rules
- Drink: Required (select one)
- Starters: Required (exactly 2)
- Main: Required (select one)
- Dessert: Required (select one)
- Attendance: Required
- Name: Required (non-empty)

---

## Other Components (Existing)

### MenuSection.js
Reusable component for displaying menu options.

**Props**:
```javascript
{
  title: string,              // Section title
  instruction: string,        // Help text
  type: 'radio' | 'checkbox', // Input type
  options?: string[],         // Flat options list
  groups?: object,            // Grouped options
  value?: string | array,     // Current value(s)
  values?: array,             // For checkboxes
  onChange: function,         // Change handler
  fieldName: string           // Field name
}
```

### RSVPForm.js
Form component for RSVP details.

**Props**:
```javascript
{
  formData: object,     // Current form state
  onChange: function,   // Update handler
  onSubmit: function    // Submit handler
}
```

### ResultSummary.js
Displays RSVP confirmation summary.

**Props**:
```javascript
{
  summaryText: string,  // Summary content
  onReset: function     // Reset handler
}
```

### IftarBackground.js
Background wrapper with overlay and vignette.

**Props**:
```javascript
{
  children: ReactNode  // Child elements
}
```

### CountdownTimer.js (Original)
Simple countdown timer display.

**Props**:
```javascript
{
  eventDate: string,    // ISO date string
  label?: string        // Custom label
}
```

---

## Styling Architecture

### Color Palette
```css
--primary-gold: #d4af37
--bright-gold: #ffd700
--dark-bg: #1a1f3a
--cream: #f6e7c1
--transparent-gold: rgba(212, 175, 55, 0.1)
```

### Typography
```css
--font-serif: 'Great Vibes', cursive
--font-body: 'Montserrat', sans-serif
--font-arabic: 'Amiri', serif
--font-decorative: 'Cinzel Decorative', serif
```

### Media Queries
```css
@media (max-width: 640px) { /* Mobile */ }
@media (min-width: 641px) and (max-width: 1024px) { /* Tablet */ }
@media (min-width: 1025px) { /* Desktop */ }
```

---

## Animation Library

### Available Keyframes
- `breathe-glow` - Scale 1 → 1.15 → 1
- `sway` - Rotate ±3°, translateY
- `lantern-zoom-out` - Scale 1 → 3, fade out
- `curtain-open-left` - translateX -100%
- `curtain-open-right` - translateX +100%
- `moon-glow` - Scale + drop-shadow
- `sparkle-float` - Radial motion + fade
- `message-fade` - Opacity fade in/out
- `staggerIn` - Fade + translateY + blur
- `scrollDown` - Pulse translateY effect

---

## Performance Tips

1. **Use React.memo** for components that don't need frequent updates
2. **Memoize callbacks** with useCallback to prevent unnecessary renders
3. **Optimize images** before deploying
4. **Lazy load** components with React.lazy if bundle gets large
5. **Monitor bundle size** with `npm run build`
6. **Test on slower devices** for animation performance

---

## Common Customizations

### Change Primary Color
Edit App.css, replace `#d4af37` with your color

### Modify Event Date
Edit CountdownTimerEnhanced.js, change:
```javascript
const iftarDate = new Date('2026-03-15T18:25:00').getTime();
```

### Add/Remove Food Items
Edit FoodSelection.js, modify `foodItems` array

### Disable Animations
Add `prefers-reduced-motion` media query handler

### Change Lantern Image
Update image path in LanternIntro.js:
```javascript
src="/assets/iftar/lantern.png"
```

---

## Debugging Tips

### Console Logging
Add to relevant handlers:
```javascript
console.log('Action triggered', data);
```

### React DevTools
- Install React DevTools browser extension
- Inspect component state in real-time
- Track component re-renders

### Performance Profiler
- Chrome DevTools → Performance tab
- Record animation interactions
- Analyze frame rates

### Accessibility Testing
- Use axe DevTools browser extension
- Check keyboard navigation
- Verify color contrast

---

**End of API Documentation**

For more information, see:
- ENHANCEMENTS.md - Feature overview
- TECH_SPECS.md - Technical specifications
- QUICK_START.md - User guide
