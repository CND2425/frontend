
# Frontend

## Beschreibung
Das **Frontend** ist die Benutzeroberfläche der E-Commerce-Anwendung und dient als Interaktionspunkt für die Benutzer. Es wurde mit **Next.js** und **Tailwind CSS** entwickelt, um eine moderne und ansprechende Benutzererfahrung zu bieten.

### Hauptfunktionen:
1. **Benutzerfreundliches UI**: Zugriff auf Benutzerkonten, Bestellungen und Produktkatalog.
2. **Interaktive Features**: Anmeldung, Suche, Bestellung und Verwaltung des Warenkorbs.
3. **Responsives Design**: Optimiert für Desktop- und mobile Geräte.

---

## Technologien
1. **Next.js**: Framework für serverseitiges Rendering und statische Websites.
2. **Tailwind CSS**: Utility-First-CSS-Framework für individuelles Styling.
3. **TypeScript**: Typsicheres JavaScript für eine robustere Codebasis.
4. **Docker**: Containerisierung der Anwendung.
5. **GitHub Actions**: CI/CD-Pipeline zur Qualitätssicherung.

---

## Installation und Verwendung
### Voraussetzungen
- **Node.js 18+**
- **npm** oder **yarn**
- **Docker** (für containerisierte Ausführung)

### Lokale Ausführung
- **Repository klonen**:
  ```bash
  git clone <REPOSITORY_URL>
  cd frontend
  ```

- **Abhängigkeiten installieren**:
  ```bash
  npm install
  ```

- **Entwicklungsserver starten**:
  ```bash
  npm run dev
  ```

- **Anwendung öffnen**:
  Die Anwendung ist verfügbar unter [http://localhost:3000](http://localhost:3000).

### Docker-Ausführung
- **Docker-Image erstellen und starten**:
  ```bash
  docker build -t frontend .
  docker run -p 3000:3000 frontend
  ```

- **Alternativ mit Docker Compose** (aus dem `Compose`-Repository):
  ```bash
  docker-compose up -d
  ```

---

## Projektstruktur
- **`/app`**: Hauptlogik und Seiten der Anwendung.
- **`/public`**: Statische Dateien wie Bilder oder das Favicon.
- **`/ui`**: Wiederverwendbare UI-Komponenten.
- **`/lib`**: Hilfsfunktionen und Definitionsdateien.
- **`/types`**: Typdefinitionen für TypeScript.

---

## Tests
1. **Testumgebung installieren**:
   ```bash
   npm install
   ```

2. **Tests ausführen**:
   ```bash
   npm run test
   ```

---

## CI/CD
1. Der Service verwendet **GitHub Actions**, um Tests und Linting automatisch bei jedem Commit auszuführen.
2. Die Konfiguration befindet sich in `.github/workflows/ci.yml`.

---

## Umgebungsvariablen
1. `NEXT_PUBLIC_API_URL`: Basis-URL der Backend-API.

---
