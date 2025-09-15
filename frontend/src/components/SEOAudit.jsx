import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  CheckCircle, AlertCircle, XCircle, TrendingUp, Search, 
  Smartphone, Zap, Globe, Target, Users, BarChart3 
} from "lucide-react";

const SEOAudit = () => {
  const [auditResults, setAuditResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated SEO audit data - in real implementation this would come from APIs
  const seoAuditData = {
    overall_score: 87,
    performance: {
      score: 92,
      metrics: {
        "First Contentful Paint": { value: "1.2s", status: "good" },
        "Largest Contentful Paint": { value: "2.1s", status: "good" },
        "Cumulative Layout Shift": { value: "0.08", status: "good" },
        "Time to Interactive": { value: "2.8s", status: "needs_improvement" }
      }
    },
    seo: {
      score: 95,
      issues: [
        { type: "success", message: "Title tags sind SEO-optimiert", priority: "high" },
        { type: "success", message: "Meta descriptions vorhanden", priority: "high" },
        { type: "success", message: "Schema Markup implementiert", priority: "high" },
        { type: "warning", message: "Einige Alt-Tags für Bilder fehlen", priority: "medium" },
        { type: "success", message: "Sitemap.xml gefunden", priority: "medium" }
      ]
    },
    mobile: {
      score: 89,
      issues: [
        { type: "success", message: "Mobile-responsive Design", priority: "high" },
        { type: "success", message: "Touch-friendly Buttons", priority: "high" },
        { type: "warning", message: "Einige Texte sind zu klein auf Mobile", priority: "medium" }
      ]
    },
    keywords: {
      primary_keywords: [
        { keyword: "Taxi Luzern", position: 3, volume: 1200, competition: "medium" },
        { keyword: "Taxi Schwyz", position: 2, volume: 480, competition: "low" },
        { keyword: "Flughafentransfer Zürich", position: 8, volume: 890, competition: "high" }
      ],
      opportunities: [
        { keyword: "Taxi Zug 24h", volume: 320, difficulty: "easy" },
        { keyword: "Mercedes Taxi Luzern", volume: 150, difficulty: "easy" },
        { keyword: "Airport Transfer Basel", volume: 210, difficulty: "medium" }
      ]
    },
    local_seo: {
      score: 84,
      google_business: {
        verified: true,
        reviews: 39,
        rating: 5.0,
        photos: 12,
        posts: "needs_update"
      },
      citations: {
        consistent: 85,
        total: 23,
        missing: ["search.ch", "gelbeseiten.ch"]
      }
    },
    technical: {
      score: 91,
      ssl: true,
      robots_txt: true,
      sitemap: true,
      canonical_tags: true,
      structured_data: true,
      page_speed: "good"
    }
  };

  const runAudit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAuditResults(seoAuditData);
      setIsLoading(false);
    }, 3000);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getStatusIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-lg border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900 flex items-center">
            <Search className="w-8 h-8 text-blue-600 mr-3" />
            SEO Audit - Taxi Türlihof
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Umfassende Analyse Ihrer Website-Performance und SEO-Optimierung
          </p>
        </CardHeader>
        <CardContent>
          {!auditResults && (
            <div className="text-center py-8">
              <Button 
                onClick={runAudit} 
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Audit läuft...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>SEO Audit starten</span>
                  </div>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {auditResults && (
        <>
          {/* Overall Score */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-between">
                <span>Gesamt-SEO-Score</span>
                <Badge className={`text-2xl px-4 py-2 ${getScoreBadgeColor(auditResults.overall_score)}`}>
                  {auditResults.overall_score}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(auditResults.performance.score)}`}>
                    {auditResults.performance.score}
                  </div>
                  <div className="text-gray-600 flex items-center justify-center mt-1">
                    <Zap className="w-4 h-4 mr-1" />
                    Performance
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(auditResults.seo.score)}`}>
                    {auditResults.seo.score}
                  </div>
                  <div className="text-gray-600 flex items-center justify-center mt-1">
                    <Search className="w-4 h-4 mr-1" />
                    SEO
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(auditResults.mobile.score)}`}>
                    {auditResults.mobile.score}
                  </div>
                  <div className="text-gray-600 flex items-center justify-center mt-1">
                    <Smartphone className="w-4 h-4 mr-1" />
                    Mobile
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(auditResults.local_seo.score)}`}>
                    {auditResults.local_seo.score}
                  </div>
                  <div className="text-gray-600 flex items-center justify-center mt-1">
                    <Globe className="w-4 h-4 mr-1" />
                    Local SEO
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <Zap className="w-5 h-5 text-yellow-600 mr-2" />
                Site Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(auditResults.performance.metrics).map(([metric, data]) => (
                  <div key={metric} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{metric}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{data.value}</span>
                      <Badge 
                        variant={data.status === 'good' ? 'default' : 'secondary'}
                        className={data.status === 'good' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {data.status === 'good' ? 'Gut' : 'Verbesserung möglich'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SEO Issues */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <Search className="w-5 h-5 text-blue-600 mr-2" />
                SEO Analyse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditResults.seo.issues.map((issue, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    {getStatusIcon(issue.type)}
                    <span className="flex-1 text-gray-900">{issue.message}</span>
                    <Badge variant="outline" className="text-xs">
                      {issue.priority === 'high' ? 'Hoch' : issue.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Keywords Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <Target className="w-5 h-5 text-green-600 mr-2" />
                Keyword Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Aktuelle Rankings</h4>
                  <div className="space-y-2">
                    {auditResults.keywords.primary_keywords.map((kw, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-900">{kw.keyword}</span>
                          <div className="text-sm text-gray-600">
                            Suchvolumen: {kw.volume}/Monat • Konkurrenz: {kw.competition}
                          </div>
                        </div>
                        <Badge className={`${kw.position <= 5 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          Position {kw.position}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Keyword-Möglichkeiten</h4>
                  <div className="space-y-2">
                    {auditResults.keywords.opportunities.map((opp, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-900">{opp.keyword}</span>
                          <div className="text-sm text-gray-600">
                            Suchvolumen: {opp.volume}/Monat
                          </div>
                        </div>
                        <Badge variant="outline" className="text-blue-700">
                          {opp.difficulty === 'easy' ? 'Einfach' : opp.difficulty === 'medium' ? 'Mittel' : 'Schwer'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Local SEO */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <Globe className="w-5 h-5 text-purple-600 mr-2" />
                Local SEO Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Google Business Profile</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Verifiziert</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Bewertungen</span>
                      <span className="font-bold">{auditResults.local_seo.google_business.reviews} (⭐ {auditResults.local_seo.google_business.rating})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Fotos</span>
                      <span className="font-bold">{auditResults.local_seo.google_business.photos}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Posts</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Update erforderlich
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Citations & Verzeichnisse</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Konsistenz</span>
                      <span className="font-bold">{auditResults.local_seo.citations.consistent}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Einträge gesamt</span>
                      <span className="font-bold">{auditResults.local_seo.citations.total}</span>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Fehlende Einträge:</p>
                      <div className="flex flex-wrap gap-2">
                        {auditResults.local_seo.citations.missing.map((citation, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {citation}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-orange-800 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Prioritäts-Aktionsplan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-2">🔥 Hohe Priorität (sofort angehen)</h4>
                  <ul className="space-y-1 text-sm text-red-700">
                    <li>• Alt-Tags für alle Bilder hinzufügen</li>
                    <li>• Google Business Profile regelmäßig mit Posts aktualisieren</li>
                    <li>• Mobile Textgrößen optimieren</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2">⚡ Mittlere Priorität (nächste 2 Wochen)</h4>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>• Einträge in search.ch und gelbeseiten.ch erstellen</li>
                    <li>• Mehr lokale Backlinks aufbauen</li>
                    <li>• Zeit bis Interaktivität optimieren</li>
                    <li>• Content für "Taxi Zug 24h" Keywords erstellen</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">✅ Langfristig (nächste 4 Wochen)</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Long-tail Keywords für Mercedes Taxi Luzern optimieren</li>
                    <li>• Kundenbewertungen aktiv sammeln</li>
                    <li>• FAQ-Sektion erweitern</li>
                    <li>• Blog für lokale SEO starten</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default SEOAudit;