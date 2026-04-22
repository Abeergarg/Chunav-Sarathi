'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';
import { 
  MapPin, Navigation, ArrowLeft, 
  ShieldCheck, Clock, Users, Building,
  Droplets, Accessibility, Share2, Info,
  PhoneCall, ExternalLink
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, Button } from '@/components';

// Enhanced Mock Data with Facilities and Metrics
const BOOTH_DATA = {
  id: "B-104",
  name: "Govt. Model Primary School, Sector 4",
  constituency: "Chandigarh Parliamentary Constituency",
  location: { lat: 30.7333, lng: 76.7794 },
  address: "Building No. 42, Near Rock Garden, Sector 4, Chandigarh, 160001",
  timings: "7:00 AM - 6:00 PM",
  queueLevel: "Medium",
  estimatedWait: "18 mins",
  lastUpdated: "2 mins ago",
  facilities: [
    { name: "Drinking Water", icon: <Droplets size={14} /> },
    { name: "Wheelchair Ramp", icon: <Accessibility size={14} /> },
    { name: "Shaded Queue", icon: <Info size={14} /> },
    { name: "Medical Aid", icon: <PhoneCall size={14} /> }
  ]
};

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "all",
      "elementType": "geometry.fill",
      "stylers": [{ "weight": "2.00" }]
    }
  ],
  tilt: 45,
  heading: 0,
};

export default function BoothLocatorPage() {
  const router = useRouter();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { isLoaded: isMapScriptLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    setIsLoaded(true);
    
    // Cinematic Reveal
    setTimeout(() => {
      mapInstance.setTilt(45);
      let heading = 0;
      const rotate = () => {
        if (heading < 90) {
          heading += 0.2;
          mapInstance.setHeading(heading);
          requestAnimationFrame(rotate);
        }
      };
      rotate();
    }, 1500);
  }, []);

  const center = useMemo(() => BOOTH_DATA.location, []);

  return (
    <main className={styles.pageMain}>
      <AnimatePresence>
        {!isMapScriptLoaded && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loader}></div>
            <p>Syncing with ECI Satellite Systems...</p>
          </div>
        )}
      </AnimatePresence>

      {/* Command Center Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.backLink} onClick={() => router.push('/dashboard')}>
            <ArrowLeft size={18} /> Back to Dashboard
          </div>
          <h1>Booth Intel</h1>
          <div className={styles.statusIndicator}>
            <div className={styles.pulse}></div>
            <span>Live System Updates</span>
          </div>
        </div>

        <div className={styles.sidebarContent}>
          <section className={styles.infoSection}>
            <h3>Polling Station Details</h3>
            <div className={styles.boothMainInfo}>
              <div className={styles.boothTitle}>
                <div className={styles.iconBox}><Building size={24} /></div>
                <div>
                  <h2>{BOOTH_DATA.name}</h2>
                  <p>Booth ID: {BOOTH_DATA.id}</p>
                </div>
              </div>
              <div className={styles.addressBox}>
                <MapPin size={18} style={{marginTop: '4px'}} />
                <p>{BOOTH_DATA.address}</p>
              </div>
            </div>
          </section>

          <section className={styles.infoSection}>
            <h3>Real-time Metrics</h3>
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <label><Clock size={12} /> EST. WAIT</label>
                <span className={styles.metricValue}>{BOOTH_DATA.estimatedWait}</span>
              </div>
              <div className={styles.metricCard}>
                <label><Users size={12} /> QUEUE STATUS</label>
                <span className={`${styles.metricValue} ${styles.queueMed}`}>{BOOTH_DATA.queueLevel}</span>
              </div>
            </div>
            <p style={{fontSize: '0.75rem', color: '#94a3b8', marginTop: '10px', textAlign: 'center'}}>
              Last updated {BOOTH_DATA.lastUpdated}
            </p>
          </section>

          <section className={styles.infoSection}>
            <h3>On-Site Facilities</h3>
            <div className={styles.facilityList}>
              {BOOTH_DATA.facilities.map((f, i) => (
                <div key={i} className={styles.facilityItem}>
                  {f.icon} {f.name}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className={styles.sidebarFooter}>
          <Button 
            variant="primary" 
            fullWidth 
            className={styles.mainAction}
            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${BOOTH_DATA.location.lat},${BOOTH_DATA.location.lng}`)}
          >
            <Navigation size={20} /> Open in Navigation
          </Button>
          <div className={styles.secondaryActions}>
            <Button variant="outline" size="sm" fullWidth>
              <Share2 size={16} /> Share
            </Button>
            <Button variant="outline" size="sm" fullWidth>
              <PhoneCall size={16} /> Helpline
            </Button>
          </div>
        </div>
      </aside>

      {/* Full-screen Map Area */}
      <div className={styles.mapWrapper}>
        {!isLoaded && <div className={styles.mapLoading}>Initializing Viewport...</div>}
        {isMapScriptLoaded && (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={18}
            onLoad={onLoad}
            options={mapOptions}
          >
            <Marker 
              position={center} 
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new google.maps.Size(40, 40)
              }}
            />
          </GoogleMap>
        )}
        
        {/* Map Overlays */}
        <div className={styles.overlayInfo}>
          <ShieldCheck size={18} color="#00875a" />
          <span>Verified Polling Station</span>
          <ExternalLink size={14} color="#94a3b8" />
        </div>
      </div>
    </main>
  );
}
