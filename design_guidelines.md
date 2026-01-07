# Aquaculture Management System Design Guidelines

## Design Approach
**System Selected**: Fluent Design - Optimized for data-heavy, productivity-focused enterprise applications with clear information hierarchy and efficient workflows.

**Justification**: This aquaculture management system is utility-focused, information-dense, and requires stable patterns for daily operational use by farm managers and workers.

## Core Design Elements

### Color Palette
**Primary Colors (Dark Mode)**:
- Background: 210 15% 8%
- Surface: 210 12% 12% 
- Primary: 210 85% 55%
- Text: 210 8% 92%

**Primary Colors (Light Mode)**:
- Background: 210 15% 98%
- Surface: 210 12% 100%
- Primary: 210 85% 45%
- Text: 210 15% 15%

**Accent Colors**: 
- Success (healthy fish/water): 145 65% 45%
- Warning (attention needed): 35 85% 55%
- Error (critical alerts): 355 75% 50%

### Typography
**Font Family**: Inter (Google Fonts)
- Headers: 600 weight, sizes 24px-32px
- Body: 400 weight, 14px-16px
- Data/metrics: 500 weight, 12px-14px
- Interface labels: 500 weight, 12px

### Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, and 8
- Component padding: p-4, p-6
- Section margins: m-4, m-6, m-8
- Grid gaps: gap-4, gap-6
- Card spacing: p-4, m-2

### Component Library

**Navigation**:
- Sidebar navigation with collapsible sections
- Top header with user profile and notifications
- Breadcrumb navigation for deep pages

**Data Display**:
- Cards for pond status, fish inventory summaries
- Tables for detailed records and logs
- Charts for water quality trends and growth metrics
- Status indicators with color-coded badges

**Forms**:
- Input groups for pond parameters
- Date/time pickers for feeding schedules
- Dropdown selectors for fish species
- Toggle switches for automated systems

**Dashboard Elements**:
- KPI metric cards with large numbers
- Progress bars for feeding completion
- Alert banners for critical notifications
- Quick action buttons for common tasks

### Key Design Principles
1. **Data Clarity**: Information hierarchy with clear visual separation
2. **Operational Efficiency**: Quick access to daily tasks and critical alerts
3. **Consistency**: Standardized patterns across all management modules
4. **Accessibility**: High contrast ratios and clear typography for outdoor/mobile use
5. **Vietnamese Localization**: Appropriate text spacing and character support

### Visual Approach
Clean, functional interface prioritizing information density over visual flourish. Focus on clear data presentation, logical grouping of related functions, and minimal cognitive load for daily operational tasks.

**No Hero Images**: This is a productivity application focused on dashboard efficiency rather than marketing appeal.