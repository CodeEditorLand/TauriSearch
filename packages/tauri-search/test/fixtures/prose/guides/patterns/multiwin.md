---
title: Multiwin
---

import Alert from '@theme/Alert'
import useBaseUrl from '@docusaurus/useBaseUrl'

import Rater from '@theme/Rater'

<div className="row">
  <div className="col col--4">
    <table>
	<tr>
		<td>
			Ease of Use
		</td>
		<td>
			<rater value="4">
				<tr>
					<td>
						Extensibility
					</td>
					<td>
						<rater value="4">
							<tr>
								<td>
									Performance
								</td>
								<td>
									<rater value="3">
										<tr>
											<td>
												Security
											</td>
											<td>
												<rater value="5">
												</rater>
											</td>
										</tr>
									</rater>
								</td>
							</tr>
						</rater>
					</td>
				</tr>
			</rater>
		</td>
	</tr>
</table>
  </div>
  <div className="col col--4 pattern-logo">
    <img src={useBaseUrl('img/patterns/Multiwin.png')} alt="Multiwin" />
  </div>
  <div className="col col--4">
    Pros:
    <ul>
      <li>Windows can be spawned or destroyed at runtime</li>
      <li>Separation of concerns</li>
    </ul>
    Cons:
    <ul>
      <li>Somewhat complex</li>
    </ul>
  </div>
</div>

## Description

The Multiwin recipe will allow you to have multiple windows.

## Diagram

import Mermaid, { colors } from '@theme/Mermaid'

<Mermaid chart={`graph LR
      A==>H
      H==>F
      H==>G
      subgraph WEBVIEW
      F
      end
      subgraph WINIT
      G
      end
      subgraph RUST
      A
      end
      A[Binary]
      F[Window]
      G[Window]
      H{Bootstrap}
      style WINIT stroke:${colors.blue.dark},stroke-width:4px
      style RUST fill:${colors.orange.light},stroke:${colors.orange.dark},stroke-width:4px
      style WEBVIEW fill:${colors.blue.light},stroke:${colors.blue.dark},stroke-width:4px`} />


## Configuration

Here's what you need to add to your tauri.conf.json file:
```json
"tauri": {
  "allowlist": {},                  // all API endpoints are default false
  "windows": [{
    "title": "Window1",
    "label": "main",
  }, {
    "title": "Splash",
    "label": "splashscreen"
  }]
}

```
