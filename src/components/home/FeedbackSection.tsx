
"use client";

const feedbacks = [
  {
    number: "01",
    name: "Sarah Ahmed",
    role: "Homeowner",
    text: "CraftHaus completely transformed our living space. The attention to detail and quality of the work were exceptional.",
    project: "The Oak Residence",
  },
  {
    number: "02",
    name: "Daniel Rahman",
    role: "Apartment Owner",
    text: "From the first consultation to the final installation, everything felt thoughtful, professional, and beautifully executed.",
    project: "Northside Apartment",
  },
  {
    number: "03",
    name: "Nadia Karim",
    role: "Homeowner",
    text: "They understood exactly what we wanted and turned our ideas into a space that feels genuinely like home.",
    project: "Quiet Living",
  },
  {
    number: "04",
    name: "Michael Hasan",
    role: "Property Owner",
    text: "The craftsmanship is outstanding. Every material, finish, and detail was handled with real care.",
    project: "Stone & Light",
  },
  {
    number: "05",
    name: "Farhan Chowdhury",
    role: "Homeowner",
    text: "A smooth experience from beginning to end. The team was responsive, precise, and incredibly easy to work with.",
    project: "Cedar House",
  },
];

export default function FeedbackSection() {
  return (
    <section className="border-t border-[#dedbd4] bg-[#f8f7f4] pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs tracking-[0.3em] text-[#b8895b]">
              CLIENT FEEDBACK
            </p>

            <h2 className="max-w-2xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-[#24302b] sm:text-5xl lg:text-6xl">
              Spaces that
              <br />
              <span className="font-serif italic text-[#b8895b]">
                speak for themselves.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-[#6f716d]">
            A few words from the people who trusted CraftHaus to shape
            their spaces.
          </p>
        </div>

        {/* Automatic Horizontal Feedback */}
        <div className="overflow-hidden">
          <div className="feedback-track flex w-max gap-5">
            {[...feedbacks, ...feedbacks].map((feedback, index) => (
              <article
                key={`${feedback.number}-${index}`}
                className="flex w-[320px] shrink-0 flex-col justify-between border border-[#dedbd4] bg-white p-7 sm:w-[380px] sm:p-8"
              >
                <div>
                  <div className="mb-10 flex items-center justify-between">
                    <span className="text-xs tracking-[0.2em] text-[#b8895b]">
                      {feedback.number}
                    </span>

                    <span className="text-xs tracking-[0.15em] text-[#6f716d]">
                      {feedback.project}
                    </span>
                  </div>

                  <p className="text-lg leading-8 text-[#24302b]">
                    “{feedback.text}”
                  </p>
                </div>

                <div className="mt-12 border-t border-[#dedbd4] pt-5">
                  <p className="text-sm font-semibold text-[#24302b]">
                    {feedback.name}
                  </p>

                  <p className="mt-1 text-xs tracking-[0.12em] text-[#6f716d]">
                    {feedback.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Motion Hint */}
        <div className="mt-6 flex items-center gap-3 text-xs tracking-[0.25em] text-[#6f716d]">
          <span className="h-px w-10 bg-[#b8895b]" />
          <span>CLIENT STORIES</span>
          <span>→</span>
        </div>
      </div>
    </section>
  );
}
