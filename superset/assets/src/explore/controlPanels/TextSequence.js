
import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
      {
          label: t('Query'),
          description: t('Use this section if you want a query that aggregates'),
          expanded: true,
          controlSetRows: [
            ['groupby'],
          ],
      },
      {
          label: t('Options'),
          expanded: true,
          controlSetRows: [
            ['subheader']
          ],
      },
  ],
};
