import { DevelopmentLanding } from '@/features/development/DevelopmentLanding';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('/website-development', 'Website Developer in Nigeria — Warri & Lagos', 'Business website and app development with Dennis Okaro Jones in Warri, Delta State, serving Lagos, Lekki, Victoria Island, Ikeja and clients across Nigeria.', 'services');
export default function Page() { return <DevelopmentLanding />; }
