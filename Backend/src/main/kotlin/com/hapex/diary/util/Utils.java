package com.hapex.diary.util;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Optional;

/**
 * Created by barthap on 18.10.2018.
 * No idea what to write here
 * *you know, no IDEA, IntelliJ IDEA xDDD
 */
public class Utils {

    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static final String DATETIME_FORMAT = DATE_FORMAT + " HH:mm:ss";


    public static <T> Optional<T> optionalSingleResult(Collection<T> collection) {

        if(collection.isEmpty() || collection.size() > 1)
            return Optional.empty();

        return Optional.of(collection.iterator().next());
    }

    public static String dateTimeToDbStr(DateTime dt, boolean dateOnly) {
        //DateFormat dateFormat = new SimpleDateFormat();
        //return dateFormat.format(dt);
        return dt.toString(dateOnly ? Utils.DATE_FORMAT : Utils.DATETIME_FORMAT);
    }

    public static String dateTimeToDbStr(DateTime dt) {
        return dateTimeToDbStr(dt, false);
    }

    public static DateTime dbStrToDateTime(String raw, boolean dateOnly) {
        return DateTime.parse(raw,
                DateTimeFormat.forPattern(dateOnly ? Utils.DATE_FORMAT : Utils.DATETIME_FORMAT));
    }

    public static DateTime dbStrToDateTime(String raw) {
        return dbStrToDateTime(raw, false);
    }
}
