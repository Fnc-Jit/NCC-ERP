# 🎛️ NCC Digital Command & Management Platform (NCC-ERP)

[![Version](https://img.shields.io/badge/Version-1.0.0--confidential-blue?style=flat-square)](#)
[![Next.js](https://img.shields.io/badge/Next.js-14.x--16.x-black?logo=nextdotjs&style=flat-square)](#)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&style=flat-square)](#)
[![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?logo=flutter&style=flat-square)](#)
[![Supabase](https://img.shields.io/badge/Supabase-BaaS-3ECF8E?logo=supabase&style=flat-square)](#)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&style=flat-square)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwindcss&style=flat-square)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&style=flat-square)](#)
[![RLS Security](https://img.shields.io/badge/Supabase_RLS-Enforced-success?style=flat-square)](#)
[![Compliance](https://img.shields.io/badge/DPDP_Act-Compliant-blue?style=flat-square)](#)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#)

---

## 📖 Project Overview

The **NCC Digital Command & Management Platform (NCC-ERP)** is a unified, full-stack web (React/Next.js) and mobile (Android/Flutter) application designed to digitize, automate, and streamline all administrative, academic, and operational activities of a university National Cadet Corps (NCC) unit.

It replaces fragmented, manual, and unreliable communication channels (such as paper registers, physical logbooks, and chaotic WhatsApp groups) with a single, secure, role-aware, and real-time digital ecosystem.

### 🎯 Key Performance Indicators (KPIs)
```mermaid
pie title Success Metrics & Objectives (6-Month Targets)
    "Daily Active Users (DAU >60%)" : 60
    "Attendance Entry Rate (>95%)" : 95
    "Event No-Show Rate (<10%)" : 10
    "Weekly Quiz Completion (>50%)" : 50
```

### 👤 Stakeholders & Role Matrix

The platform implements a strict role-based permission hierarchy, ensuring separation of duties and secure data access:

| Feature / Action | Cadet | Senior Under Officer (SUO) | Associate NCC Officer (ANO) | System Admin |
| :--- | :---: | :---: | :---: | :---: |
| **View Own Attendance** | 🟢 Yes | 🟢 Yes | 🟢 Yes | 🟢 Yes |
| **View All Cadet Attendance** | 🔴 No | 🟡 Own Company Only | 🟢 Yes | 🟢 Yes |
| **Mark Attendance** | 🔴 No | 🟡 Own Company Only | 🟢 Yes | 🔴 No |
| **Dispute Own Attendance** | 🟢 Yes | 🟢 Yes | 🔴 No | 🔴 No |
| **Resolve Attendance Dispute** | 🔴 No | 🔴 No | 🟢 Yes | 🔴 No |
| **Upload Study Resources** | 🔴 No | 🔴 No | 🟢 Yes | 🔴 No |
| **Create / Edit Events** | 🔴 No | 🔴 No | 🟢 Yes | 🔴 No |
| **Post Blog / Achievement** | 🟡 Pending Approval | 🟡 Pending Approval | 🟢 Auto-Approved | 🔴 No |
| **Approve Blog Posts** | 🔴 No | 🔴 No | 🟢 Yes | 🔴 No |
| **Submit Anonymous Feedback** | 🟢 Yes | 🟢 Yes | 🔴 No | 🔴 No |
| **Read Feedback & Respond** | 🔴 No | 🔴 No | 🟢 Yes | 🔴 No |
| **Manage User Accounts** | 🔴 No | 🔴 No | 🔴 No | 🟢 Yes |
| **View Audit Logs** | 🔴 No | 🔴 No | 🔴 No | 🟢 Yes |

---

### 🏗️ System Architecture

The platform uses a modern **Backend-as-a-Service (BaaS)** model powered by Supabase. A single Supabase instance exposes REST and real-time WebSocket APIs, consumed by both the Next.js web application and the Flutter mobile app.

```mermaid
graph TD
    subgraph Clients["Frontend Clients"]
        Web["Next.js Web Portal<br>(ANO Dashboard & Admin Panel)"]
        Mobile["Flutter Android App<br>(Cadet Mobile App)"]
    end

    subgraph Supabase["Supabase BaaS Core"]
        Auth["Supabase Auth<br>(JWT, Invite-Only Workflow)"]
        Database[("PostgreSQL 15 Database<br>(Row Level Security - RLS)")]
        Storage["Supabase Storage<br>(PDF Notes, Media Gallery)"]
        Edge["Supabase Edge Functions<br>(PDF Generation, RSS Importer)"]
    end

    subgraph Integrations["Third-Party Services"]
        FCM["Firebase Cloud Messaging<br>(FCM Push Notifications)"]
        Resend["Resend Email API<br>(Invites, OTP & Digests)"]
    end

    Web -->|HTTPS / WebSocket| Supabase
    Mobile -->|HTTPS / WebSocket| Supabase
    
    Database -->|Triggers| Edge
    Edge -->|Push Notifications| FCM --> Mobile
    Edge -->|SMTP Trigger| Resend
```

---

### 🛡️ Core Security Architecture & True Anonymity Flow

The platform utilizes **SHA-256 hashing with a dynamic daily salt** to maintain 100% feedback anonymity for cadets while preventing spam. 

```mermaid
sequenceDiagram
    autonumber
    actor Cadet as Cadet (Client)
    participant SDK as Supabase SDK & Client-Side Code
    participant DB as Supabase PostgreSQL Database (RLS Enforced)
    actor ANO as Associate NCC Officer (ANO)

    Note over Cadet, SDK: Cadet drafts feedback submission
    SDK->>SDK: Generate anonymous_token =<br>SHA-256(user_id + daily_salt + day_bucket)
    SDK->>DB: INSERT into suggestions<br>(anonymous_token, category, body)
    Note over DB: Database accepts INSERT.<br>No user_id or IP is written.
    
    ANO->>DB: SELECT * FROM suggestions
    Note over DB: RLS policy grants SELECT to ANO role.<br>Cadet role cannot SELECT.
    DB-->>ANO: Return anonymous suggestions wall
    
    Note over ANO: ANO reads feedback & replies
    ANO->>DB: UPDATE suggestions SET ano_response, responded_at
```

---

### 📅 Implementation Roadmap

The deployment of the NCC-ERP platform follows a highly structured, phased release pipeline to ensure stable onboarding:

```mermaid
gantt
    title NCC-ERP Phased Deployment Schedule
    dateFormat  YYYY-MM-DD
    section Phase 1: Core System
    Supabase DB & RLS Setup        :active, p1, 2026-06-01, 10d
    Invite-Only Auth Pipeline      :active, p2, 2026-06-11, 8d
    section Phase 2: Operations
    Attendance Marking Module      :p3, 2026-06-19, 12d
    Attendance Dispute Workflows   :p4, 2026-07-01, 7d
    Events & Parade Calendar       :p5, 2026-07-08, 10d
    section Phase 3: Academics
    Study Material Storage Bucket  :p6, 2026-07-18, 5d
    Interactive Quiz Engine        :p7, 2026-07-23, 10d
    section Phase 4: Social & Rank
    Blog & Camp Experience Board   :p8, 2026-08-02, 8d
    Rank Holder & Hierarchy Setup  :p9, 2026-08-10, 7d
    section Phase 5: Feedback & Launch
    Salted Anonymity Suggestion Wall:p10, 2026-08-17, 8d
    FCM Real-time Notifications   :p11, 2026-08-25, 10d
    Institutional Deployment       :p12, 2026-09-04, 7d
```

---

### 📷 Platform Interface Showcase

Below are screenshots of the fully wired NCC-ERP digital portal interfaces, showcasing the clean UI and dynamic data grids:

| **Officer Command Dashboard** | **Cadet Onboarding & Login** |
| :---: | :---: |
| ![Officer Command Dashboard](asset/SCR-20260624-uaek.png) | ![Cadet Onboarding & Login](asset/SCR-20260624-uaia.png) |
| **Attendance Marking & Drill Sessions** | **Parade & Camp Event Calendar** |
| ![Attendance Marking](asset/SCR-20260624-uajl.png) | ![Event Calendar](asset/SCR-20260624-uakv.png) |
| **Study & B/C Certificate Materials** | **Salted Anonymous Suggestion Wall** |
| ![Study Materials](asset/SCR-20260624-uamd.png) | ![Anonymous Suggestion Wall](asset/SCR-20260624-uarp.png) |
| **Rank & Hierarchy Management** | **Interactive Quiz Engine** |
| ![Rank & Hierarchy Management](asset/SCR-20260624-uatu.png) | ![Interactive Quiz Engine](asset/SCR-20260624-uawr.png) |

---

## 📁 Repository Structure

```text
.
├── src/
│   ├── app/                      # App Router Routes & Layouts
│   │   ├── (auth)/               # Authentication screens (Login, Reset)
│   │   └── dashboard/            # Officer, Cadet & Admin dashboard pages
│   ├── components/               # Shared UI elements & shadcn/ui components
│   ├── hooks/                    # Custom React Query & Zustand state hooks
│   └── lib/                      # Supabase client instances & helpers
│
├── public/                       # Static public assets
├── asset/                        # Interface screenshots (for documentation)
│
├── package.json                  # Next.js scripts & dependencies
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration settings
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── README.md                     # Repository documentation (This file)
```

---

## 🚀 Quick Start Guide

### 💻 Local Development Setup

#### 1. Prerequisites
Ensure you have **Node.js 18+** installed on your system.

#### 2. Install Dependencies
Install all required packages from the repository root:
```bash
npm install
```

#### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

#### 4. Launch the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🧪 Testing Methodology

The platform employs a multi-tiered testing strategy ensuring code quality, security compliance, and robust reliability:

1. **Unit Tests (Jest & Flutter Test)**:
   - Covers core business logic including cadet attendance percentage computation, eligibility thresholds, and cryptographic token generation.
2. **Integration Tests (Supabase Local Emulator & Jest)**:
   - Validates Row Level Security (RLS) policies, database triggers, and Supabase Edge Functions.
3. **End-to-End Tests (Playwright & Flutter integration_test)**:
   - Simulates complete user journeys: Cadet disputes attendance, ANO approves a blog, and Admin performs a bulk CSV import.
4. **Load Testing (k6)**:
   - Validates that the Supabase backend can handle peak loads (e.g., 300+ cadets marking attendance within a 30-second window at the end of a parade).
5. **Security Audits (OWASP ZAP)**:
   - Regular vulnerability scans targeting Auth bypass, XSS, and SQL injections.

---

## ⚖️ Compliance & Governance
- **Data Protection**: Designed in strict compliance with the **Digital Personal Data Protection (DPDP) Act 2023** (India). No personal identifiers are logged in audit tables, and cadet records are archived or anonymized upon graduation.
- **Audit Trails**: Every write, rank promotion, or attendance override triggered by an ANO or Admin writes an immutable record to the `audit_logs` table.
