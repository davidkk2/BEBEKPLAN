"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CanvasImageGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(300)
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")
  const [shape, setShape] = useState("circle")
  const [shapeColor, setShapeColor] = useState("#FF6B6B")
  const [shapeSize, setShapeSize] = useState(50)
  const [text, setText] = useState("BebekPlan")
  const [textColor, setTextColor] = useState("#333333")
  const [fontSize, setFontSize] = useState(24)

  useEffect(() => {
    drawCanvas()
  }, [width, height, backgroundColor, shape, shapeColor, shapeSize, text, textColor, fontSize])

  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Draw background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)

    // Draw shape
    ctx.fillStyle = shapeColor
    const centerX = width / 2
    const centerY = height / 2

    if (shape === "circle") {
      ctx.beginPath()
      ctx.arc(centerX, centerY, shapeSize, 0, Math.PI * 2)
      ctx.fill()
    } else if (shape === "square") {
      ctx.fillRect(centerX - shapeSize / 2, centerY - shapeSize / 2, shapeSize, shapeSize)
    } else if (shape === "triangle") {
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - shapeSize / 2)
      ctx.lineTo(centerX - shapeSize / 2, centerY + shapeSize / 2)
      ctx.lineTo(centerX + shapeSize / 2, centerY + shapeSize / 2)
      ctx.closePath()
      ctx.fill()
    }

    // Draw text
    ctx.fillStyle = textColor
    ctx.font = `${fontSize}px Arial, sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, centerX, centerY + shapeSize + fontSize)
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const a = document.createElement("a")
    a.href = canvas.toDataURL("image/png")
    a.download = "bebekplan-image.png"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Görsel Oluşturucu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width">Genişlik (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    min={50}
                    max={1000}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Yükseklik (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    min={50}
                    max={1000}
                  />
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
                <Label htmlFor="shape">Şekil</Label>
                <Select value={shape} onValueChange={setShape}>
                  <SelectTrigger id="shape">
                    <SelectValue placeholder="Şekil seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="circle">Daire</SelectItem>
                    <SelectItem value="square">Kare</SelectItem>
                    <SelectItem value="triangle">Üçgen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="shapeColor">Şekil Rengi</Label>
                <div className="flex gap-2">
                  <Input
                    id="shapeColor"
                    type="color"
                    value={shapeColor}
                    onChange={(e) => setShapeColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input value={shapeColor} onChange={(e) => setShapeColor(e.target.value)} className="flex-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="shapeSize">Şekil Boyutu: {shapeSize}px</Label>
                <Slider
                  id="shapeSize"
                  min={10}
                  max={150}
                  step={1}
                  value={[shapeSize]}
                  onValueChange={(value) => setShapeSize(value[0])}
                  className="py-4"
                />
              </div>

              <div>
                <Label htmlFor="text">Metin</Label>
                <Input id="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Metin girin" />
              </div>

              <div>
                <Label htmlFor="textColor">Metin Rengi</Label>
                <div className="flex gap-2">
                  <Input
                    id="textColor"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input value={textColor} onChange={(e) => setTextColor(e.target.value)} className="flex-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="fontSize">Font Boyutu: {fontSize}px</Label>
                <Slider
                  id="fontSize"
                  min={8}
                  max={72}
                  step={1}
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  className="py-4"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="border rounded-md p-4 flex items-center justify-center bg-gray-50">
                <canvas
                  ref={canvasRef}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    border: "1px solid #ddd",
                  }}
                />
              </div>

              <Button onClick={downloadImage} className="w-full">
                Görseli İndir (PNG)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
