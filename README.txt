# Preparatı Yoxla — MVP

Bu paket 01.09.2026 tarixli AQTA pestisid və aqrokimyəvi reyestrlərindən hazırlanmış 3,670 qeydlik texniki baza ilə işləyən mobil uyğun veb-prototipdir.

Fayllar:
- index.html — interfeys və axtarış
- data.json — 3,670 strukturlaşdırılmış qeyd

İstifadə:
1. index.html və data.json eyni qovluqda saxlanılır.
2. Sadə test üçün local serverlə açmaq məsləhətdir.
3. İstehsalda HTTPS hostingə yerləşdirilə bilər.

Qeyd:
- Dövlət qeydiyyatının bitmə tarixi ilə qablaşdırmanın EXP tarixi ayrıdır.
- PDF səhifəsi audit üçün saxlanılıb.
- Bu, ilk texniki MVP-dir; PDF parserində bəzi uzun sətirlərdə sütun sürüşməsi ola bilər. Hüquqi/source-of-truth kimi AQTA-nın orijinal PDF-ləri əsas götürülməlidir.
