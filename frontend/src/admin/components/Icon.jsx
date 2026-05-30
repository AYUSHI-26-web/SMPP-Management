function Icon({ type, className = 'h-5 w-5' }) {
  const paths = {
    chevron: <path d="m6 9 6 6 6-6" />,
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M10 20v-6h4v6" />
      </>
    ),
    service: (
      <>
        <path d="m12 3 8 4-8 4-8-4z" />
        <path d="m4 12 8 4 8-4" />
        <path d="m4 17 8 4 8-4" />
      </>
    ),
    wallet: (
      <>
        <path d="M4 7h16v11H4z" />
        <path d="M16 11h4v4h-4a2 2 0 0 1 0-4Z" />
      </>
    ),
    card: (
      <>
        <path d="M4 6h16v12H4z" />
        <path d="M4 10h16" />
      </>
    ),
    reports: (
      <>
        <path d="M5 19V9" />
        <path d="M12 19V5" />
        <path d="M19 19v-8" />
      </>
    ),
    settings: (
      <>
        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
        <path d="M4 12h2m12 0h2M12 4v2m0 12v2m-5.7-2.3 1.4-1.4m8.6-8.6 1.4-1.4m0 11.4-1.4-1.4M7.7 7.7 6.3 6.3" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    code: (
      <>
        <path d="m9 18-6-6 6-6" />
        <path d="m15 6 6 6-6 6" />
      </>
    ),
    profile: (
      <>
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
    mail: (
      <>
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    send: <path d="m3 11 18-8-8 18-2-8z" />,
    paper: (
      <>
        <path d="m3 11 18-8-8 18-2-8z" />
        <path d="m11 13 5-5" />
      </>
    ),
    double: (
      <>
        <path d="m4 12 3 3 5-6" />
        <path d="m12 12 3 3 5-6" />
      </>
    ),
    x: (
      <>
        <path d="m7 7 10 10" />
        <path d="m17 7-10 10" />
      </>
    ),
    plusCircle: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    filter: <path d="M4 5h16l-6 7v5l-4 2v-7z" />,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" />,
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />
      </>
    ),
    calendar: (
      <>
        <path d="M7 3v4" />
        <path d="M17 3v4" />
        <path d="M4 8h16" />
        <path d="M5 5h14v16H5z" />
      </>
    ),
    phone: (
      <>
        <path d="M7 4h10v16H7z" />
        <path d="M11 17h2" />
      </>
    ),
    location: (
      <>
        <path d="M12 21s7-5 7-11a7 7 0 1 0-14 0c0 6 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    image: (
      <>
        <path d="M4 5h16v14H4z" />
        <path d="m4 15 4-4 4 4 3-3 5 5" />
        <circle cx="9" cy="9" r="1.5" />
      </>
    ),
    lock: (
      <>
        <path d="M7 10V8a5 5 0 0 1 10 0v2" />
        <path d="M6 10h12v10H6z" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} fill-none stroke-current stroke-2`}>
      {paths[type]}
    </svg>
  )
}

export default Icon
