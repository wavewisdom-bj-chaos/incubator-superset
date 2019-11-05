
import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
      {
          label: t('SELECT'),
          description: t('Use this section if you want a query that aggregates'),
          expanded: true,
          controlSetRows: [
              ['columns'],
              ['metrics'],
              ['groupby'],
              ['timeseries_limit_metric', 'row_limit'],
              ['include_time', 'order_desc'],
          ],
       },
      {
          label: t('Formatter'),
          description: t('Use this section edit display format'),
          expanded: true,
          controlSetRows: [
              ['formatter']
          ],
       }
  ],
};
