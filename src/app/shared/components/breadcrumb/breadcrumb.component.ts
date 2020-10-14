import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BreadCrumb} from '../../models/breadcrumb';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    distinctUntilChanged(),
    map(event => this.buildBreadCrumb(this.activatedRoute.root))
  );

  // Build your breadcrumb starting with the root route of your current activated route

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '',
                  breadcrumbs: Map<String,BreadCrumb> = new Map()): Array<BreadCrumb> {
    // If no routeConfig is avalailable we are on the root path
    if(route.routeConfig == undefined || route.routeConfig == null) {
      return this.buildBreadCrumb(route.firstChild);
    }
    const label = route.routeConfig?.data ? route.routeConfig.data['breadcrumb']:'Home';
    const path = route.routeConfig?.path ? route.routeConfig.path : '';
    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
      label: label,
      url: nextUrl,
    };
    //const newBreadcrumbs = [...breadcrumbs, breadcrumb];
    breadcrumbs.set(label,breadcrumb);

    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, breadcrumbs);
    }
    let breadCrumnbArr : BreadCrumb[] = [];
    for(let breadcrumb of breadcrumbs.values()) {
      breadCrumnbArr.push(breadcrumb);
    }
    return breadCrumnbArr;
  }
}
