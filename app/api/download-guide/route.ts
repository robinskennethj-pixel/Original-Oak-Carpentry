import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// GET /api/download-guide - Download the free Florida home maintenance guide
export async function GET(request: NextRequest) {
  try {
    // Create comprehensive guide content
    const guideContent = `
ORIGINAL OAK CARPENTRY
Ultimate Florida Home Maintenance Guide

TABLE OF CONTENTS
1. Seasonal Maintenance Checklists
2. Hurricane Preparation Tips
3. Wood Care in Humid Climate
4. When to Call a Professional
5. Emergency Contact Information

═══════════════════════════════════════════════════════════════

CHAPTER 1: SEASONAL MAINTENANCE CHECKLISTS

SPRING MAINTENANCE (March - May)
□ Inspect roof for winter damage
□ Clean gutters and downspouts
□ Check exterior caulking and sealants
□ Inspect and clean HVAC system
□ Test irrigation system
□ Trim trees and shrubs away from house
□ Inspect deck and outdoor structures
□ Check for termite activity
□ Clean and inspect windows and screens
□ Test smoke and carbon monoxide detectors

SUMMER MAINTENANCE (June - August)
□ Prepare for hurricane season
□ Service air conditioning system
□ Inspect and repair exterior paint
□ Check pool equipment and safety features
□ Maintain outdoor furniture and structures
□ Monitor for pest activity
□ Clean and maintain outdoor lighting
□ Inspect irrigation for water efficiency
□ Check attic ventilation
□ Maintain landscaping for storm resistance

FALL MAINTENANCE (September - November)
□ Hurricane season wrap-up inspection
□ Clean and store outdoor furniture
□ Inspect heating system
□ Check and clean fireplace/chimney
□ Winterize pool if applicable
□ Inspect and repair exterior surfaces
□ Clean and maintain tools
□ Check emergency supplies
□ Inspect foundation for settling
□ Prepare for cooler weather

WINTER MAINTENANCE (December - February)
□ Protect plants from cold snaps
□ Inspect plumbing for freeze protection
□ Check insulation and weatherstripping
□ Maintain heating system
□ Plan spring projects
□ Review insurance coverage
□ Inspect interior for humidity issues
□ Check emergency generator
□ Maintain security systems
□ Plan landscape improvements

═══════════════════════════════════════════════════════════════

CHAPTER 2: HURRICANE PREPARATION TIPS

PRE-SEASON PREPARATION (April - May)
• Review your hurricane plan with family
• Update emergency supply kit
• Inspect and reinforce weak points in home
• Trim trees and remove dead branches
• Check generator and fuel supplies
• Review insurance policies
• Create digital copies of important documents
• Identify evacuation routes
• Stock up on non-perishable supplies
• Test emergency communication devices

STRUCTURAL PREPARATIONS
• Install hurricane straps if not present
• Reinforce garage doors
• Check and repair roof attachments
• Secure outdoor furniture and decorations
• Install storm shutters or plywood
• Clear drainage areas around home
• Inspect and repair fencing
• Secure pool equipment
• Check foundation for cracks
• Ensure proper attic ventilation

DURING HURRICANE SEASON (June - November)
• Monitor weather forecasts regularly
• Keep emergency supplies stocked
• Maintain clear evacuation routes
• Keep vehicles fueled
• Charge all electronic devices
• Stay informed through official channels
• Follow evacuation orders immediately
• Document property for insurance
• Secure important documents
• Maintain communication with family

POST-STORM INSPECTION
• Wait for official all-clear before going outside
• Check for structural damage
• Document all damage with photos
• Contact insurance company immediately
• Avoid downed power lines
• Check for gas leaks
• Inspect roof and windows for damage
• Remove debris safely
• Check HVAC system before use
• Begin cleanup and repairs promptly

═══════════════════════════════════════════════════════════════

CHAPTER 3: WOOD CARE IN HUMID CLIMATE

UNDERSTANDING FLORIDA'S CLIMATE CHALLENGES
Florida's subtropical climate presents unique challenges for wood:
• High humidity (70-90% year-round)
• Frequent rainfall and moisture
• Intense UV radiation
• Salt air in coastal areas
• Temperature fluctuations
• Pest pressure (termites, carpenter ants)

MOISTURE MANAGEMENT
• Ensure proper ventilation in all areas
• Use dehumidifiers in enclosed spaces
• Maintain gutters and drainage systems
• Seal exterior wood surfaces regularly
• Check for and repair leaks promptly
• Allow air circulation around wood structures
• Use moisture barriers where appropriate
• Monitor humidity levels indoors
• Address condensation issues quickly
• Maintain proper grading around foundation

WOOD TREATMENT AND PROTECTION
• Apply appropriate sealers and stains
• Use marine-grade finishes in coastal areas
• Reapply protective coatings regularly
• Choose pressure-treated lumber for outdoor use
• Use stainless steel or galvanized fasteners
• Apply borate treatments for insect protection
• Consider natural oil finishes for interior wood
• Use proper ventilation during application
• Follow manufacturer's recommendations
• Schedule regular maintenance intervals

PEST PREVENTION
• Conduct annual termite inspections
• Eliminate wood-to-soil contact
• Remove dead wood and debris
• Maintain proper moisture levels
• Use treated lumber for ground contact
• Install physical barriers where needed
• Monitor for signs of infestation
• Address issues immediately
• Use integrated pest management
• Work with licensed pest control professionals

COMMON WOOD PROBLEMS IN FLORIDA
1. Rot and Decay
   - Caused by moisture and fungal growth
   - Prevention: proper sealing and ventilation
   - Treatment: remove affected areas, treat, replace

2. Insect Damage
   - Termites, carpenter ants, powder post beetles
   - Prevention: regular inspections, treatments
   - Treatment: professional pest control

3. UV Damage
   - Fading, cracking, surface deterioration
   - Prevention: UV-resistant finishes, shade
   - Treatment: sand, seal, refinish

4. Warping and Splitting
   - Caused by moisture changes
   - Prevention: proper sealing, controlled environment
   - Treatment: replacement if severe

═══════════════════════════════════════════════════════════════

CHAPTER 4: WHEN TO CALL A PROFESSIONAL

STRUCTURAL ISSUES
Call immediately for:
• Sagging rooflines or floors
• Cracks in foundation or walls
• Doors and windows that won't close properly
• Visible structural damage
• Water damage to framing
• Termite or other pest damage
• Hurricane or storm damage
• Electrical issues with wood structures
• Plumbing leaks affecting wood
• Any safety concerns

COMPLEX REPAIRS
Professional help recommended for:
• Roof repairs or replacement
• Foundation work
• Major framing repairs
• Electrical work near wood structures
• Plumbing modifications
• HVAC installations
• Structural modifications
• Permit-required work
• Insurance claim repairs
• Historic restoration work

SAFETY CONSIDERATIONS
Never attempt DIY for:
• Work requiring permits
• Electrical connections
• Structural modifications
• Roof work above one story
• Work near power lines
• Hazardous material removal
• Major plumbing changes
• Gas line work
• Work requiring special tools
• Anything beyond your skill level

CHOOSING A CONTRACTOR
Look for:
• Proper licensing and insurance
• Local references and reviews
• Written estimates and contracts
• Warranty on work performed
• Knowledge of local codes
• Experience with Florida climate
• Professional certifications
• Good Better Business Bureau rating
• Transparent pricing
• Clear communication

═══════════════════════════════════════════════════════════════

CHAPTER 5: EMERGENCY CONTACT INFORMATION

ORIGINAL OAK CARPENTRY
Phone: (813) 555-0123
Email: info@originaloakcarpentry.com
Website: www.originaloakcarpentry.com
Address: 123 Workshop Lane, Tampa, FL 33602

24/7 Emergency Services Available

SERVICES WE PROVIDE:
• Hurricane damage repair
• Structural carpentry
• Custom woodwork
• Deck and porch construction
• Kitchen and bathroom renovation
• Outdoor living spaces
• Historic restoration
• Insurance claim assistance

OTHER IMPORTANT CONTACTS:
• Emergency: 911
• Non-emergency police: [Your local number]
• Fire department: [Your local number]
• Poison control: 1-800-222-1222
• Electric company: [Your utility company]
• Gas company: [Your utility company]
• Water department: [Your utility company]
• Insurance company: [Your policy information]

MAINTENANCE SCHEDULE REMINDERS:
• Spring inspection: March 1st
• Hurricane prep: May 1st
• Summer maintenance: June 1st
• Fall inspection: September 1st
• Winter prep: December 1st
• Annual termite inspection: [Set date]
• HVAC service: [Set dates]
• Roof inspection: [Set date]

═══════════════════════════════════════════════════════════════

ABOUT ORIGINAL OAK CARPENTRY

With over 20 years of experience serving Florida homeowners, Original Oak Carpentry combines traditional craftsmanship with modern techniques to create beautiful, durable projects that withstand our unique climate challenges.

Our team of master craftsmen specializes in:
• Hurricane-resistant construction
• Sustainable building practices
• Custom millwork and cabinetry
• Historic restoration
• Outdoor living spaces
• Emergency repair services

We're committed to using the finest materials and time-tested techniques to ensure your project not only looks beautiful but stands the test of time in Florida's demanding environment.

Contact us today for a free consultation and estimate.

═══════════════════════════════════════════════════════════════

© 2024 Original Oak Carpentry. All rights reserved.
This guide is provided for informational purposes only. Always consult with qualified professionals for specific advice regarding your home maintenance needs.

Download date: ${new Date().toLocaleDateString()}
    `

    // Create a blob with the guide content
    const blob = new Blob([guideContent], { type: 'text/plain' })
    
    // Set headers for file download
    const headers = new Headers()
    headers.set('Content-Type', 'application/octet-stream')
    headers.set('Content-Disposition', 'attachment; filename="Florida_Home_Maintenance_Guide.txt"')
    headers.set('Content-Length', blob.size.toString())

    return new Response(blob, { headers })
  } catch (error) {
    console.error('Error generating guide:', error)
    return NextResponse.json(
      { error: 'Failed to generate guide' },
      { status: 500 }
    )
  }
}

