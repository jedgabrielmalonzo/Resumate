import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { GeneratedResumeData } from '@/context/ResumeContext';

const TEMPLATE_COLORS: Record<string, { accent: string; text: string }> = {
  classic: { accent: '#2c3e50', text: '#ffffff' },
  modern: { accent: '#c40000', text: '#ffffff' },
  it: { accent: '#1565c0', text: '#ffffff' },
};

function buildResumeHTML(data: GeneratedResumeData, templateId: string): string {
  const colors = TEMPLATE_COLORS[templateId] ?? TEMPLATE_COLORS.classic;

  const sectionsHTML = data.sections
    .map((section) => {
      const lines = section.content
        .split('\n')
        .filter((l) => l.trim())
        .map((line) => {
          if (line.trimStart().startsWith('•')) {
            return `<li>${line.replace(/^\s*•\s*/, '').trim()}</li>`;
          }
          return `<p style="margin:4px 0">${line}</p>`;
        })
        .join('');

      return `
        <div style="margin-bottom:20px">
          <div style="background:${colors.accent};color:${colors.text};padding:7px 14px;border-radius:3px;margin-bottom:8px">
            <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.1px">${section.title}</span>
          </div>
          <div style="padding:0 4px;font-size:13px;color:#333;line-height:1.65">
            <ul style="margin:0;padding-left:16px;list-style:disc">${lines}</ul>
          </div>
        </div>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { font-family: Georgia, 'Times New Roman', serif; margin: 48px; color: #222; background: #fff; }
    ul { margin: 4px 0; padding-left: 18px; }
    li { margin-bottom: 3px; }
    p { margin: 4px 0; }
  </style>
</head>
<body>
  ${sectionsHTML}
</body>
</html>`;
}

export async function exportResumeToPDF(
  data: GeneratedResumeData,
  templateId: string
): Promise<void> {
  const html = buildResumeHTML(data, templateId);
  const { uri } = await Print.printToFileAsync({ html, base64: false });

  const canShare = await Sharing.isAvailableAsync();
  if (!canShare) {
    throw new Error('Sharing is not available on this device.');
  }
  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: 'Save your resume',
    UTI: 'com.adobe.pdf',
  });
}
