Cypress.Commands.add(
    'loadStory',
    (component: string, story: string, knobs?: { [knob: string]: string }) => {
        const componentParameter = component.replace(/[|/]/gu, '-').toLowerCase()
        const storyParameter = story
            .replace(/\s/gu, '-')
            .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/gu, '$1-$2')
            .toLowerCase()
        const queryParameters: Record<string, string> = {
            id: `${componentParameter}-${storyParameter}`,
            viewMode: 'story',
        }
        if (knobs) {
            const knobParameters: string[] = []
            Object.keys(knobs).forEach((knob) => {
                knobParameters.push(`${knob}:${knobs[knob]}`)
            })
            queryParameters.args = knobParameters.join(';')
        }
        const queryStrings: string[] = []
        Object.keys(queryParameters).forEach((parameter) => {
            queryStrings.push(`${parameter}=${queryParameters[parameter]}`)
        })
        return cy.visit(`iframe.html?${queryStrings.join('&')}`)
    }
)

export {}