"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function LogoGenerator() {
  const [text, setText] = useState("BebekPlan")
  const [color, setColor] = useState("#FF6B6B")
  const [backgroundColor, setBackgroundColor] = useState("#F7F7F7")
  const [fontSize, setFontSize] = useState(24)
  const [padding, setPadding] = useState(20)
  const [borderRadius, setBorderRadius] = useState(10)
  const [svgCode, setSvgCode] = useState("")

  const generateSVG = () => {
    // Calculate text width (approximate)
    const textWidth = text.length * fontSize * 0.6
    const width = textWidth + padding * 2
    const height = fontSize + padding * 2

    const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${backgroundColor}" rx="${borderRadius}" />
      <text 
        x="50%" 
        y="50%" 
        fontFamily="Arial, sans-serif" 
        fontSize="${fontSize}" 
        fill="${color}" 
        textAnchor="middle" 
        dominantBaseline="middle"
      >
        ${text}
      </text>
    </svg>`

    setSvgCode(svg)
  }

  const downloadSVG = () => {
    if (!svgCode) return

    const blob = new Blob([svgCode], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${text.toLowerCase().replace(/\s+/g, "-")}-logo.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Logo Oluşturucu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="text">Logo Metni</Label>
                <Input
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Logo metni girin"
                />
              </div>

              <div>
                <Label htmlFor="color">Metin Rengi</Label>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input value={color} onChange={(e) => setColor(e.target.value)} className="flex-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="backgroundColor">Arkaplan Rengi</Label>
                <div className="flex gap-2">
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="fontSize">Font Boyutu: {fontSize}px</Label>
                <Slider
                  id="fontSize"
                  min={12}
                  max={72}
                  step={1}
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  className="py-4"
                />
              </div>

              <div>
                <Label htmlFor="padding">Dolgu: {padding}px</Label>
                <Slider
                  id="padding"
                  min={5}
                  max={50}
                  step={1}
                  value={[padding]}
                  onValueChange={(value) => setPadding(value[0])}
                  className="py-4"
                />
              </div>

              <div>
                <Label htmlFor="borderRadius">Köşe Yuvarlaklığı: {borderRadius}px</Label>
                <Slider
                  id="borderRadius"
                  min={0}
                  max={50}
                  step={1}
                  value={[borderRadius]}
                  onValueChange={(value) => setBorderRadius(value[0])}
                  className="py-4"
                />
              </div>

              <Button onClick={generateSVG} className="w-full">
                Logo Oluştur
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="border rounded-md p-4 flex items-center justify-center min-h-[200px] bg-gray-50">
                {svgCode ? (
                  <div dangerouslySetInnerHTML={{ __html: svgCode }} />
                ) : (
                  <p className="text-gray-400">Logo önizlemesi burada görünecek</p>
                )}
              </div>

              {svgCode && (
                <>
                  <div>
                    <Label htmlFor="svgCode">SVG Kodu</Label>
                    <textarea
                      id="svgCode"
                      value={svgCode}
                      readOnly
                      className="w-full h-32 p-2 border rounded-md font-mono text-sm"
                    />
                  </div>

                  <Button onClick={downloadSVG} variant="outline" className="w-full">
                    SVG İndir
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
