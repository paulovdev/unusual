import { RevealText } from "@/components/reveal-text";

const coreDisciplines = [
  "Spatial Architecture",
  "Bespoke Joinery & Furniture",
  "Full Turnkey Execution",
  "Atmospheric Lighting Design",
  "Tactile Material Sourcing",
  "Volume & Layout Strategy",
  "High-End Residential",
  "On-Site Design Oversight",
];

const creativeFocus = [
  "Design Direction",
  "Narrative Concepting",
  "Tactile Curation",
  "Material Exploration",
  "Collector Item Selection",
  "Luminous Ambience",
  "Architectural Harmony",
  "Enduring Space Delivery",
];

const StudioApproach = () => {
  return (
    <>
      <section
        data-nav-theme="dark"
        className="pt-50 pb-25 p-5 w-full grid grid-cols-5 gap-10
            max-lg:pt-10 max-lg:flex max-lg:flex-col max-lg:items-start max-lg:px-2.5"
      >
        <div className="w-full col-span-2">
          <RevealText
            className="mb-10 max-w-125 font-neue font-normal 
    text-p text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-none"
            text="We engineer quiet sanctuaries defined by structural clarity, tactile depth, and a relentless pursuit of spatial harmony."
          />
        </div>

        <div className="w-full col-span-3 flex flex-col justify-between gap-5">
          <div className="flex flex-col items-start w-full">
            <RevealText
              text="Methodology"
              className="font-neue font-light text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%] leading-[.9]"
            />
            <RevealText
              text="& Practice"
              className="ml-15 font-neue font-light text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%] leading-[.9]"
              delay={0.1}
            />

            <RevealText
              className="mt-8 max-w-125 font-neue font-normal 
    text-p text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-none"
              text="Our practice bridges architectural precision with bespoke interior curation, stripping away noise to reveal the raw essence of refined living."
              delay={0.2}
            />
          </div>

          <div className="pt-15 border-t border-p/15 w-full">
            <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
              <div className="w-full">
                <div className="mb-10 flex items-center gap-3">
                  <span className="relative -top-0.5 size-2 rotate-45 bg-p" />
                  <RevealText
                    text="Core Disciplines"
                    className="font-chivo font-semibold text-[14px] tracking-widest uppercase text-p leading-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-y-3">
                  {coreDisciplines.map((item, i) => (
                    <RevealText
                      key={item}
                      text={`(${String(i + 1).padStart(2, "0")}) ${item}`}
                      className="font-neue font-normal 
    text-p text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-none"
                      delay={i * 0.1}
                    />
                  ))}
                </div>
              </div>

              <div className="w-full">
                <div className=" mb-10 flex items-center gap-3">
                  <span className="relative -top-0.5 size-2 rotate-45 bg-p" />
                  <RevealText
                    text="Creative Focus"
                    className="font-chivo font-semibold text-[14px] tracking-widest uppercase text-p leading-none"
                    delay={0.1}
                  />
                </div>

                <div className="grid grid-cols-1 gap-y-3">
                  {creativeFocus.map((item, i) => (
                    <RevealText
                      key={item}
                      text={`(${String(i + 1).padStart(2, "0")}) ${item}`}
                      className="font-neue font-normal 
    text-p text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-none"
                      delay={i * 0.1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudioApproach;
