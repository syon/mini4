import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'

Sentry.init({
  dsn:
    'https://d1b7549bae6a48b7ae228e6886a05556@o410123.ingest.sentry.io/5283782',
  integrations: [new VueIntegration({ Vue, attachProps: true })],
})
