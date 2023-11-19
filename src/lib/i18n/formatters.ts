import type { FormattersInitializer } from 'typesafe-i18n';
import type { Locales, Formatters } from './i18n-types';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js'
import tz from 'dayjs/plugin/timezone.js'

dayjs.extend(utc);
dayjs.extend(tz);

export const initFormatters: FormattersInitializer<Locales, Formatters> = (locale: Locales) => {

	const formatters: Formatters = {
		simpleTime: (d: Date) => dayjs.utc(d).tz(dayjs.tz.guess()).format('HH:mm:ss'),
		simpleDate: (d: Date) => {
			const formatted = locale === "es"
				? dayjs.utc(d).tz(dayjs.tz.guess()).format('DD/MM/YYYY')
				: dayjs.utc(d).tz(dayjs.tz.guess()).format('YYYY-MM-DD');
			return formatted;
		},
		simpleDateTime: (d: Date) => {
			const formatted = locale === "es"
				? dayjs.utc(d).tz(dayjs.tz.guess()).format('HH:mm:ss DD/MM/YYYY')
				: dayjs.utc(d).tz(dayjs.tz.guess()).format('YYYY-MM-DD HH:mm:ss');
			return formatted;
		},
	}

	return formatters;
}
