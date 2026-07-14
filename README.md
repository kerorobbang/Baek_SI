# Seungil Baek — Research Homepage

Seungil Baek(백승일, 부산대학교) 개인 연구자 홈페이지. Google Scholar 프로필 데이터를 기반으로 한 정적 사이트입니다.

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

- **논문 목록**: [assets/js/publications.js](assets/js/publications.js) 상단의 `PUBLICATIONS` 배열을 수정. [Google Scholar 프로필](https://scholar.google.co.kr/citations?user=MsjuSigAAAAJ)이 원본 출처.
- **통계(총 인용수 / h-index / i10-index)**: [index.html](index.html)의 Stats 섹션에서 직접 수정.
- **이미지**: `assets/images/`에 프로필 사진(`portrait.jpg`)과 갤러리 사진(카테고리별 7종 × 3장)이 들어 있습니다. [PNU-QUREOS Activity 페이지](https://sites.google.com/view/pnu-qureos/activity)에서 가져온 실제 현장조사 사진입니다. 더 넣거나 교체하려면 같은 폴더에 파일을 추가하고 `gallery.html`/`index.html`의 `<img src="assets/images/...">`를 수정하세요.
- **이메일 등 연락처**: `seung1100@pusan.ac.kr`(PNU-QUREOS Members 페이지에서 확인된 실제 주소)를 사용 중입니다. 바뀌면 각 페이지의 `mailto:` 링크를 교체하세요.
