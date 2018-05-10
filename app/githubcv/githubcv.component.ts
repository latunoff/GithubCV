import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Route, Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Directive, ViewContainerRef } from '@angular/core';
import { User } from './githubcv.user';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-root',
  templateUrl: './githubcv.component.html',
  styleUrls: ['./githubcv.component.css']
})

export class GitHubCvComponent implements OnInit {
  rForm: FormGroup;
  message: string;
  loading = false;
  user: User;
  reps = [];
  hint_text_color = '';

  myType = 'first';

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              public viewContainerRef: ViewContainerRef
            ) {
    
    this.createForm();
  }

  ngOnInit() {
    // this.rForm.setValue({name: 'latunoff'});
    this.reset();
  }

  reset() {
    this.user = {
      id: 0,
      name: '',
      login: '',
      repos_url: '',
      repos: [], 
      organizations_url: '',
      orgs: [], 
      gists_url: '',
      gists: [],
      languages: [],
      sizes: [],
      created_at: ''
    };
  }

  run() {
    let newUser: User;
    let languages = [];
    let sizes = [];
    this.loading = true;
    this.hint_text_color = ''

    axios.get(`https://api.github.com/users/${this.rForm.value.name}`)
      .then(resp => {
        newUser = resp.data;

        axios.get(newUser.repos_url)
        .then(repos => {
          newUser.repos = repos.data;

          axios.get(newUser.organizations_url)
          .then(orgs => {
            this.loading = false;

            newUser.orgs = orgs.data;
            // console.log(newUser.organizations_url, newUser.orgs);

            newUser.created_at = moment(newUser.created_at).format('LLL');

            newUser.languages = [];
            languages = newUser.repos.map(e => e.language);
            languages = languages.filter(e => e !== null);
            languages.map(lang => {
              const found = newUser.languages.find(exist => exist.name === lang);
              if (!found) {
                newUser.languages.push({ name: lang, count: 1, perc: (1 / languages.length * 100).toFixed() });
              } else {
                found.count++;
                found.perc = (found.count / languages.length * 100).toFixed();
              }
            });
            newUser.languages.sort((a, b) => a.count > b.count ? -1 : 1);

            newUser.sizes = [];
            sizes = newUser.repos.map(e => ({name: e.name, size: e.size}));
            sizes = sizes.filter(e => e.size > 0);
            let size_max = 0;
            sizes.forEach(e => {
              if (e.size > size_max) size_max = e.size;
            });
            
            sizes.map(size => {
              if (size.size > 0)
                newUser.sizes.push({ name: size.name, size: size.size, perc: (size.size / size_max * 100).toFixed(1) });
            });
            newUser.sizes.sort((a, b) => a.size > b.size ? -1 : 1);

            this.user = newUser;

            // setTimeout(() => this.hint_text_color = 'white', 5000)

            // axios.get(newUser.gists_url.replace('{/gist_id}', ''))
            // .then(gists => {
            //   newUser.gists = gists.data;
            // });
          });
        })
        .catch(error => {
          console.log(error);
          this.message = 'Repos load error';
        });
      })
      .catch(error => {
        console.log(error);
        this.message = 'User not found';
      });
  }

  onClick() {
    this.myType = this.myType === 'first' ? 'second' : 'first';
  }

  createForm() {
    this.rForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    });
  }
}
