export default function ResumeActions({ resumes }) {
  return (
    <section className="page-shell flex items-center justify-center font-mona">
      {resumes.map((resume) => (
        <div key={resume.href} className="panel w-full max-w-3xl p-8 text-center sm:p-12">
          <h2 className="page-title mb-6">{resume.heading}</h2>
          <div className="space-y-8">
            <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300">{resume.description}</p>
            <div className="glass glass-cluster mx-auto flex w-fit flex-col justify-center gap-1 rounded-[1.75rem] p-1.5 sm:flex-row sm:rounded-full">
              <a
                href={resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-button"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0A9 9 0 113 12a9 9 0 0118 0z" />
                </svg>
                {resume.viewLabel}
              </a>
              <a
                href={resume.href}
                download={resume.filename}
                className="primary-button"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {resume.downloadLabel}
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
