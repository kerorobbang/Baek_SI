# Seungil Baek — Research Homepage

Seungil Baek(백승일, 부산대학교) 개인 연구자 홈페이지. 학술지 원문·DOI와 Google Scholar를 참조해 관리하는 정적 사이트입니다. 최종 서지 검토: **2026-10-08**.

- Home: [index.html](index.html)
- Research: [research.html](research.html)
- Publications: [publications.html](publications.html)
- Gallery: [gallery.html](gallery.html)

## Tech

순수 HTML + [Tailwind CSS (Play CDN)](https://tailwindcss.com/) + vanilla JS. 빌드 과정이나 서버가 필요 없는 정적 사이트라 GitHub Pages에 바로 배포할 수 있습니다.

```
.
├── index.html
├── research.html
├── publications.html
├── gallery.html
└── assets/
    ├── css/style.css        공용 스타일 (그리드 패턴, 모달, 플레이스홀더 이미지 등)
    ├── js/
    │   ├── theme.js         Tailwind 디자인 토큰 + 다크모드 + 모바일 메뉴
    │   └── publications.js  논문 목록 데이터 + 검색/필터/모달 렌더링
    └── images/              프로필 사진 + 갤러리 사진 (PNU-QUREOS 랩 사이트에서 가져옴)
```

## 로컬에서 미리보기

```bash
python -m http.server 8000
# http://localhost:8000 접속
```

## GitHub Pages 배포

1. 이 저장소를 GitHub에 push
2. Settings → Pages → Source를 `main` 브랜치 `/ (root)`로 설정
3. `https://<username>.github.io/<repo>/` 에서 확인

## 데이터 갱신하기

- **논문 목록**: [assets/js/publications.js](assets/js/publications.js)의 `PUBLICATIONS` 배열이 유일한 원본 데이터입니다. 새 논문에는 정식 게재연도(`year`), 저자, 학술지, DOI(`doi`)를 기입하세요. [Google Scholar 프로필](https://scholar.google.co.kr/citations?user=MsjuSigAAAAJ), 학술지/출판사 및 KCI/KIOST 서지정보를 대조합니다.
- **논문 편수**: 홈페이지·CV의 `[data-publication-count]`, `[data-publications-year]` 값은 `publications.js`에서 자동 갱신됩니다. 새 자료 추가 시 HTML 편수만 따로 고칠 필요가 없습니다.
- **인용 관련 수치**: [Google Scholar 연구자 프로필](https://scholar.google.co.kr/citations?user=MsjuSigAAAAJ)의 **2026-10-08 사용자 제공 스냅샷**을 기준으로 총 126회(2021년 이후 125회), h-index 7, i10-index 5를 표시합니다. 논문별 인용수 합계도 126회로 검증했습니다. 실시간 자동 연동이 아니므로 새 스냅샷을 받아 수동 갱신합니다.
- **저널 IF 및 Quartile**: `JOURNAL_METRICS`에 기록된 2025 JCR 또는 KCI 지표를 사용합니다. JCR IF와 KCI 2년 IF를 혼용해 비교하지 않으며 분류 분야와 원본 URL을 함께 제시합니다. 검증되지 않은 값은 `—`로 남깁니다.
- **대표논문**: 첫 화면(`index.html`)과 CV(`cv.html`)의 대표논문 카드는 직접 관리합니다. 새로운 대표 연구가 발표되면 함께 수정하세요.
- **이미지**: `assets/images/`에 프로필 사진(`portrait.jpg`)과 갤러리 사진(카테고리별 7종 × 3장)이 들어 있습니다. [PNU-QUREOS Activity 페이지](https://sites.google.com/view/pnu-qureos/activity)에서 가져온 실제 현장조사 사진입니다. 더 넣거나 교체하려면 같은 폴더에 파일을 추가하고 `gallery.html`/`index.html`의 `<img src="assets/images/...">`를 수정하세요.
- **이메일 등 연락처**: `seung1100@pusan.ac.kr`(PNU-QUREOS Members 페이지에서 확인된 실제 주소)를 사용 중입니다. 바뀌면 각 페이지의 `mailto:` 링크를 교체하세요.

## 2026-10-08 논문 업데이트

- 2026년 `Ocean Science Journal` 논문 *Multi-view Glint Correction for UAV Multispectral Imagery in Benthic-Influenced Shallow Waters* 추가 (DOI: 10.1007/s12601-026-00287-5).
- 적조 생체광학 논문(`IEEE JSTARS`, vol. 19, pp. 3761–3774)의 정식 권호 연도를 2026년으로 수정 (DOI: 10.1109/JSTARS.2025.3648570; DOI 연도는 온라인 출판 연도와 다를 수 있음).
- 기존에 확인되지 않던 연안습지 식생 논문 표기를 삭제하고, 2025년 `GEO DATA`의 울릉도·독도 대형해조류 분광 데이터셋 논문으로 서지정보 교체 (DOI: 10.22761/GD.2025.0082).
- 산림 BRDF `GEO DATA` 논문의 정식 영문 제목 및 저자 표기 정리 (DOI: 10.22761/GD.2023.0057).
- 일부 2025–2026년 논문에 검증된 DOI 링크 추가, 홈페이지/CV 대표논문과 Research 소개 갱신.

> Google Scholar는 자동 동기화하지 않습니다. 2026-10-08 사용자 제공 스냅샷을 논문별로 반영했으며 정적 파일의 인용수는 이후 증가를 자동 반영하지 않습니다.
