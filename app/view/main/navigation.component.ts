import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'navigation',
	template: `
		<div class="sidenav">
			<div style="height:60px;padding-bottom:1px">
			<img class="logoImage" src="ExtAngular.png" alt="ExtAngular" >
			<span class="logoText">ExtAngular</span>
			</div>
			<extjs #theTreeList
				fit
				[xtype]= "xtype" 
				[config]="config"
				(selectionchange)="onSelectionChange($event)"
			></extjs>
		</div>
	`
})

export class NavigationComponent {
	private xtype: any = 'treelist';
	private config: any;

	constructor (private router: Router) {
		this.config = {
			ui: 'nav',			
			expanderOnly: false, expanderFirst: false, singleExpand: true,
			store: { root: { children: [
						{ text: 'Basic Grid', leaf: true, iconCls: 'fa fa-home', link: 'basic' },
						{ text: 'Simple Grid', leaf: true, iconCls: 'fa fa-home', link: 'simple' },
						{ text: 'Analyze', leaf: true, iconCls: 'fa fa-home', link: 'analyze' },
						{ text: 'Pivot', leaf: true, iconCls: 'fa fa-home', link: 'pivot' },
						{ text: 'Grid', leaf: true, iconCls: 'fa fa-home', link: 'grid' },
						{ text: 'Basic Chart', leaf: true, iconCls: 'fa fa-home', link: 'basicchart' },
						{ text: 'Basic Calendar', leaf: true, iconCls: 'fa fa-home', link: 'basiccalendar' },
						{ text: 'D3 TreeMap', leaf: true, iconCls: 'fa fa-home', link: 'd3treemap' },
						{ text: 'D3 Sunburst', leaf: true, iconCls: 'fa fa-home', link: 'd3sunburst' },
						{ text: 'Agency', expanded: true, iconCls: 'fa fa-table', children: [
								{ text: 'Agency Grid', leaf: true, iconCls: 'fa fa-table', link:'simple' },
								{ text: 'Agency Pivot', leaf: true, iconCls: 'fa fa-list', link:'basic' },
								{ text: 'Agency Chart', leaf: true, iconCls: 'fa fa-bar-chart', link:'grid' }
							]
						},
						{ text: 'Button', leaf: true, iconCls: 'fa fa-cog' , link: 'button'},
					]
				}
			}
		}
	}

	private onSelectionChange( event ) {
		this.router.navigate(['/' + event.node.data.link]);
	}

}
