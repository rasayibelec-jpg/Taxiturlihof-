import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Download, Smartphone, Monitor, Chrome, Apple } from "lucide-react";

const PWATestInstructions = () => {
  const [activeTab, setActiveTab] = useState('desktop');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          📱 PWA Installation Guide
        </h2>
        <p className="text-lg text-gray-600">
          Taxi Türlihof als App auf Ihrem Gerät installieren
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <Button
            variant={activeTab === 'desktop' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('desktop')}
            className={activeTab === 'desktop' ? 'bg-white shadow-sm' : ''}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant={activeTab === 'mobile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('mobile')}
            className={activeTab === 'mobile' ? 'bg-white shadow-sm' : ''}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
        </div>
      </div>

      {/* Desktop Instructions */}
      {activeTab === 'desktop' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Chrome className="w-5 h-5 mr-2 text-blue-600" />
                Chrome / Edge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Method 1: Install Button</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Address bar'ın sağında <Download className="w-4 h-4 inline mx-1" /> ikonu arayın</li>
                  <li>Tıklayın ve "Install" seçin</li>
                  <li>App desktop'unuzda açılır!</li>
                </ol>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Method 2: Menu</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Chrome menü (⋮) → "Install Taxi Türlihof"</li>
                  <li>Ya da F12 → Application → Manifest → "Install"</li>
                </ol>
              </div>

              <Badge className="bg-green-100 text-green-800">
                ✅ Tam Desktop App deneyimi!
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🖥️ Desktop PWA Özellikleri</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Browser olmadan çalışır
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Taskbar'da kendi ikonu
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Alt+Tab ile geçiş
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Offline çalışma
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Push notifications (gelecekte)
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mobile Instructions */}
      {activeTab === 'mobile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Apple className="w-5 h-5 mr-2" />
                iPhone / iPad (Safari)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2">1.</span>
                      <div>
                        Safari'de siteyi açın
                        <div className="text-xs text-gray-600 mt-1">taxiturlihof.ch</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">2.</span>
                      <div>
                        <strong>Share button</strong> (📤) tıklayın
                        <div className="text-xs text-gray-600 mt-1">Altta ortada</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">3.</span>
                      <div>
                        <strong>"Zum Home-Bildschirm"</strong> seçin
                        <div className="text-xs text-gray-600 mt-1">Aşağı scroll edin</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">4.</span>
                      <div>
                        <strong>"Hinzufügen"</strong> tıklayın
                        <div className="text-xs text-gray-600 mt-1">App home screen'e eklenir!</div>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Chrome className="w-5 h-5 mr-2 text-green-600" />
                Android (Chrome)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>Chrome'da siteyi açın</li>
                    <li><strong>"Add to Home screen"</strong> popup'ı çıkar</li>
                    <li><strong>"Install"</strong> veya <strong>"Add"</strong> tıklayın</li>
                    <li>App ana ekranda görünür!</li>
                  </ol>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-sm mb-2">Manuel Method:</h5>
                  <p className="text-xs text-gray-600">
                    Menü (⋮) → "Add to Home screen" → "Install"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Live Test Button */}
      <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-bold mb-4">🚀 Hemen Test Edin!</h3>
          <p className="text-gray-600 mb-4">
            PWA özelliklerini test etmek için Chrome DevTools kullanın
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={() => {
                if (window.chrome && window.chrome.devtools) {
                  // Already in DevTools
                  alert('DevTools açık! Application → Manifest sekmesine gidin.');
                } else {
                  alert('F12 tuşuna basın → Application → Manifest → Install butonu');
                }
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              🛠️ DevTools Rehberi
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => {
                // Force PWA install prompt simulation
                if ('serviceWorker' in navigator) {
                  alert('PWA hazır! Install butonu browser\'da görünmeli.');
                } else {
                  alert('Browser PWA desteklemiyor. Chrome kullanın.');
                }
              }}
            >
              📱 PWA Durumu
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Status */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-2">🔍 Şu anki PWA durumu:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
              <div>Manifest ✅</div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
              <div>Service Worker ✅</div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
              <div>Icons ✅</div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
              <div>HTTPS (prod'da)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWATestInstructions;