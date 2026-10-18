import { SiteContent, PrayerInquiry } from '../types';

export const initialSiteContent: SiteContent = {
  branding: {
    siteName: 'Selah Sanctuary',
    tagline: 'Contemplative Prayer & Spiritual Guidance',
    contactEmail: 'sanctuary@selahprayer.org',
    locationNote: 'Online Ministry · Serving Seekers Worldwide',
  },
  hero: {
    badgeText: 'A Quiet Harbor for the Soul',
    headline: 'Sacred intercession and still presence for life’s deepest moments.',
    subheadline:
      'Whether you carry a silent burden, seek clarity on your spiritual path, or desire dedicated prayers for someone you love, this sacred space is open to hold you in prayer.',
    quoteText: '“Be still, and know that I am with you in every breath.”',
    quoteAuthor: 'Psalm 46:10',
    primaryCtaText: 'Request Dedicated Prayer',
    secondaryCtaText: 'Explore Prayer Offerings',
  },
  approach: {
    sectionKicker: 'Our Foundation',
    title: 'A contemplative approach rooted in stillness, compassion, and presence.',
    description:
      'Spiritual prayer is not about hurried words or rigid formulas. It is an intentional slowing down—listening to the quiet whisper beneath circumstance and bringing your life before grace.',
    pillars: [
      {
        id: 'p1',
        title: 'Deep Contemplative Listening',
        description:
          'Before praying, I enter a state of receptive silence to hold the full weight of your circumstances with unconditional empathy.',
      },
      {
        id: 'p2',
        title: 'Personalized Intercession',
        description:
          'Every request is carried by name in dedicated morning and evening prayer vigils, never treated as a generic checklist.',
      },
      {
        id: 'p3',
        title: 'Uncompromised Confidentiality',
        description:
          'Your prayer requests, life stories, and personal intentions remain strictly private and held in sacred trust.',
      },
      {
        id: 'p4',
        title: 'Welcoming to All Traditions',
        description:
          'Whether you are steeped in traditional faith, spiritual but seeking, or simply in need of comfort, you are warmly embraced.',
      },
    ],
  },
  about: {
    sectionKicker: 'Our Calling',
    title: 'Walking alongside seekers in periods of transition, healing, and faith.',
    practitionerName: 'Evelyn Brooks',
    practitionerRole: 'Spiritual Director & Intercessory Minister',
    narrativeParagraphs: [
      'My journey with prayer began more than twenty years ago in quiet monasteries and hospital chapels, where I witnessed the transformative power of being spiritually remembered during life’s most vulnerable moments.',
      'Over the years, I have accompanied hundreds of individuals through unexpected illnesses, bereavement, career transitions, and seasons of spiritual desolation. My calling is simple yet profound: to create an unhurried sanctuary where every burden can be laid down, and where no one has to pray alone.',
      'I believe prayer is not a transaction, but an invitation into deeper peace. In every prayer vigil, I hold your specific hopes, fears, and beloved names with intentional care, discernment, and faith.',
    ],
    missionStatement:
      'To provide accessible, heartfelt, and reverent spiritual intercession for anyone seeking comfort, renewed hope, or deeper intimacy with the Divine.',
    values: [
      {
        title: 'Reverence & Sincerity',
        description: 'Holding every soul’s journey with sacred honor and dedicated, focused prayer.',
      },
      {
        title: 'Gentle Discernment',
        description: 'Listening for spiritual clarity rather than imposing unsolicited advice or dogma.',
      },
      {
        title: 'Open Heart & Generosity',
        description: 'Ensuring prayer is freely offered to all regardless of financial circumstance.',
      },
    ],
  },
  services: {
    sectionKicker: 'Offerings & Vigil Support',
    title: 'Intentional prayer services tailored to your current season of life.',
    description:
      'Every offering includes dedicated personal intercession, lighting of an altar beeswax candle, and a personal prayer reflection sent to your email.',
    offerings: [
      {
        id: 'serv-1',
        title: 'Personal Intercessory Prayer',
        subtitle: 'Focused prayer for personal health, emotional peace, or life decisions.',
        category: 'Individual Care',
        description:
          'A three-day dedicated morning and evening prayer vigil holding your specific name and life circumstance before God. You will receive a contemplative written reflection and scripture blessing tailored to your situation.',
        durationOrSchedule: '3 Days · Morning & Evening Vigil',
        whatIsIncluded: [
          'Personal vigil holding your name and exact intention',
          'Altar candle lit continuously during vigil sessions',
          'Personalized written prayer reflection sent to your email',
          'Follow-up spiritual encouragement note after one week',
        ],
        contribution: 'Free-will offering (open to all)',
        isFeatured: true,
      },
      {
        id: 'serv-2',
        title: 'Healing & Comfort Vigil',
        subtitle: 'Intensive prayer for acute medical diagnosis, surgery, or grief.',
        category: 'Acute Support',
        description:
          'Deep spiritual intercession specifically crafted for those facing physical health battles, chronic illness, surgical procedures, or the tender ache of loss. Focused on restoring fortitude, peace, and restorative presence.',
        durationOrSchedule: '7-Day Continuous Prayer Support',
        whatIsIncluded: [
          'Dedicated prayer prior to surgeries or medical milestones',
          'Comfort blessings for family members and caregivers',
          'Audio recording of a soothing guided healing prayer',
          'Ongoing remembrance in weekly sanctuary vigils',
        ],
        contribution: 'Free-will offering (open to all)',
        isFeatured: false,
      },
      {
        id: 'serv-3',
        title: 'Life Transition & Dedication Blessing',
        subtitle: 'Spiritual grounding for new marriages, newborns, homes, or callings.',
        category: 'Milestones',
        description:
          'Celebrate and sanctify life’s sacred turning points. Whether stepping into marriage, welcoming a child, launching a heart-led vocation, or moving to a new home, we invoke wisdom, harmony, and protection.',
        durationOrSchedule: 'Dedication Prayer & Written Certificate',
        whatIsIncluded: [
          'Custom written prayer blessing for your milestone event',
          'Ceremonial blessing parchment suitable for framing',
          '3-day dedicatory blessing focused on joy and harmony',
          'Optional 15-minute phone or video blessing invocation',
        ],
        contribution: 'Suggested $45 or pay what feels right',
        isFeatured: false,
      },
      {
        id: 'serv-4',
        title: 'Monthly Spiritual Care & Accompaniment',
        subtitle: 'Sustained prayer partnership for long-term spiritual deepening.',
        category: 'Sustained Journey',
        description:
          'For seekers traversing extended wilderness seasons or desiring a committed prayer partner month by month. Includes weekly check-ins, intentional prayer lists, and monthly contemplative reflections.',
        durationOrSchedule: 'Monthly Continuous Accompaniment',
        whatIsIncluded: [
          'Four weekly personalized prayer check-ins',
          'Direct email correspondence for timely prayer needs',
          'Monthly curated contemplative contemplation audio/reading',
          'Continuous remembrance in daily sanctuary quiet hours',
        ],
        contribution: 'Suggested $60/month (scholarships always available)',
        isFeatured: false,
      },
    ],
  },
  testimonials: {
    sectionKicker: 'Voices of Peace',
    title: 'Words from seekers who found comfort in our prayer sanctuary.',
    items: [
      {
        id: 't-1',
        quote:
          'During my husband’s surgery, the written prayer and knowing Evelyn was holding vigil gave me a profound peace I cannot explain. We felt surrounded by stillness.',
        seekerName: 'Claire M.',
        locationOrContext: 'Seattle, WA',
        intentionSummary: '7-Day Healing Vigil',
      },
      {
        id: 't-2',
        quote:
          'I came with a heavy heart about a painful family estrangement. The compassion and lack of judgment in her response brought healing into my home even before the situation resolved.',
        seekerName: 'David S.',
        locationOrContext: 'Austin, TX',
        intentionSummary: 'Family Intercession',
      },
      {
        id: 't-3',
        quote:
          'The personalized prayer blessing written for our new adoption journey was read at our home welcoming ceremony. It remains framed in our nursery as a sacred anchor.',
        seekerName: 'Elena & Marcus T.',
        locationOrContext: 'Denver, CO',
        intentionSummary: 'Life Dedication Blessing',
      },
    ],
  },
  contact: {
    sectionKicker: 'Reach Out in Confidence',
    title: 'Submit your prayer request or reach out for guidance.',
    description:
      'No request is too small or too heavy. Take a breath, write as much or as little as you feel comfortable sharing, and know your words will be treated with sacred tenderness.',
    responsePledge: 'All inquiries receive a personal response within 24 to 48 hours.',
    confidentialityNotice:
      'We respect your privacy completely. Your name, email, and prayer intentions are never shared or published.',
  },
};

export const sampleInquiries: PrayerInquiry[] = [
  {
    id: 'req-101',
    seekerName: 'Grace Henderson',
    email: 'grace.henderson@example.com',
    intentionCategory: 'Healing & Health',
    serviceRequested: 'Healing & Comfort Vigil',
    message:
      'Please pray for my mother Margaret who is beginning chemotherapy next Tuesday. Praying for peace for her anxious heart and gentle treatment outcomes.',
    candleLit: true,
    createdAt: '2026-10-16T14:32:00Z',
    status: 'in_prayer',
    spiritualNotes: 'Lit candle on 10/16. Carried Margaret in morning vigil Psalm 23. Sent initial encouragement note.',
  },
  {
    id: 'req-102',
    seekerName: 'Samuel Chen',
    email: 'samuel.c@example.org',
    intentionCategory: 'Guidance & Clarity',
    serviceRequested: 'Personal Intercessory Prayer',
    message:
      'I am at a difficult vocational crossroad between staying in corporate work or stepping into non-profit education. Seeking divine wisdom and courageous clarity.',
    candleLit: true,
    createdAt: '2026-10-17T09:15:00Z',
    status: 'new',
    spiritualNotes: '',
  },
  {
    id: 'req-103',
    seekerName: 'Hannah & Caleb Morales',
    email: 'hannah.morales@example.net',
    intentionCategory: 'Family & Relationships',
    serviceRequested: 'Life Transition & Dedication Blessing',
    message:
      'We are moving into our first family home next month with our newborn twins. Would love a prayer of blessing and protection over our threshold.',
    candleLit: false,
    createdAt: '2026-10-15T18:40:00Z',
    status: 'completed',
    spiritualNotes: 'Sent custom parchment dedication prayer on 10/16. Family replied with gratitude.',
  },
];
