import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Download, X, Smartphone, Chrome } from "lucide-react";

const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if it's iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      console.log('[PWA] beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('[PWA] App was installed');
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Show install prompt after 30 seconds on mobile (if not installed)
    const showPromptTimer = setTimeout(() => {
      if (!isInstalled && (deferredPrompt || isIOSDevice)) {
        setShowInstallPrompt(true);
      }
    }, 30000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(showPromptTimer);
    };
  }, [deferredPrompt, isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        setShowIOSInstructions(true);
      }
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('[PWA] User accepted the install prompt');
      setShowInstallPrompt(false);
    } else {
      console.log('[PWA] User dismissed the install prompt');
    }

    setDeferredPrompt(null);
  };

  const dismissPrompt = () => {
    setShowInstallPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (isInstalled || sessionStorage.getItem('pwa-prompt-dismissed')) {
    return null;
  }

  // iOS Instructions Modal
  if (showIOSInstructions) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="max-w-md w-full">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <Smartphone className="w-12 h-12 mx-auto mb-2 text-blue-600" />
              <h3 className="text-lg font-bold">App auf iPhone installieren</h3>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-600">1</div>
                <p>Tippen Sie auf das <strong>Teilen-Symbol</strong> unten im Safari-Browser</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-600">2</div>
                <p>Scrollen Sie nach unten und tippen Sie auf <strong>"Zum Home-Bildschirm"</strong></p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-600">3</div>
                <p>Tippen Sie auf <strong>"Hinzufügen"</strong> um die Taxi Türlihof App zu installieren</p>
              </div>
            </div>

            <Button 
              onClick={() => setShowIOSInstructions(false)}
              className="w-full mt-6"
            >
              Verstanden
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Install Prompt
  if (showInstallPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-40 md:left-auto md:right-4 md:w-80">
        <Card className="shadow-lg border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Download className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1">
                  📱 Taxi Türlihof App installieren
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Schnellerer Zugang zu Preisrechner und Buchung. Funktioniert auch offline!
                </p>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    onClick={handleInstallClick}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    {isIOS ? (
                      <>
                        <Safari className="w-4 h-4 mr-1" />
                        Anleitung
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-1" />
                        Installieren
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={dismissPrompt}
                    className="text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

// Safari icon component for iOS
const Safari = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 6l-3 9 9-3-3-3-3-3z" fill="currentColor"/>
  </svg>
);

export default PWAInstaller;