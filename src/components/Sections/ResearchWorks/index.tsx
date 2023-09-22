import {FC, memo} from 'react';

import {researchWorks, SectionId} from '../../../data/data';
import Section from '../../Layout/Section';
import ResumeSection from "../Common/ResumeSection";
import {CitationTemplateLoader, defaultCitationStyle} from "../../../data/CitationTemplateLoader";

const Cite = require('citation-js')

const ResearchWorks: FC = memo(() => {
  CitationTemplateLoader.loadTemplates()
  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Publications}>
      <div className="flex flex-col divide-y-2 divide-neutral-300">
        {
          Object.entries(researchWorks).map(([researchWorkType, items]) => {
            return <ResumeSection title={researchWorkType}>
              {items.map((item, index) => {
                const cite = new Cite()
                cite.set(item)
                const htmlContent = formatBibliography(
                  cite.format("bibliography", {
                    format: "html",
                    template: defaultCitationStyle
                  })
                )
                return <div key={`${researchWorkType}_${index}`} className="bibliography"
                            dangerouslySetInnerHTML={{__html: htmlContent}}/>
              })}
            </ResumeSection>
          })
        }
      </div>
    </Section>
  );
});

/**
 * Method to highlight author name and remove n.d. for unpublished works
 * @param rawBibliography
 */
const formatBibliography = (rawBibliography: String) => {
  const textsToBold = ["Zhou, Kayee", "Kayee Zhou"]
  const textsToRemove = [" (n.d.)", ", n.d"]
  let output = rawBibliography
  textsToBold.forEach(textToBold =>
    output = output.replace(textToBold, `<b>${textToBold}</b>`)
  )
  textsToRemove.forEach(textToRemove =>
    output = output.replace(textToRemove, "")
  )
  console.log(output)
  return output
}

ResearchWorks.displayName = 'Research Works';
export default ResearchWorks;
