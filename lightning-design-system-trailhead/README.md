Lightning Component with Salesforce Lightning Design System: Trailhead
----------------------------------------------------------------------

A Lightning Component using Salesforce Lightning Design System(SLDS).

Please see: https://developer.salesforce.com/trailhead/project/slds-lightning-components-workshop
(Same tutorial as https://github.com/ForceDotComLabs/sldsx/blob/master/tutorial/tutorial.md)

### How to deploy

This component uses Force.com Migration Tool to deploy.

- Download Force.com Migration Tool and place `and-salesforce.jar` under your ant lib directory (e.g. `~/.ant/lib`)
- Rename `build.properties.sample` to `build.properties`
- Input Salesforce organization credentials (username and password)
- Run `ant deployCode`
