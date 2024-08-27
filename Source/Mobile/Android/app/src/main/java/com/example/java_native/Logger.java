package com.example.java_native;

import android.content.Context;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class Logger {

    private static File logFile;
    private static FileWriter writer;

    public static void initLogFile(Context context) {
        File logDir = context.getExternalFilesDir(null); // Use appropriate directory
        if (logDir != null) {
            logFile = new File(logDir, "_joinRoom-android-native.txt");
            try {
                writer = new FileWriter(logFile, true);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public static File getLogFile() {
        return logFile;
    }

    public static void log(String message) {
        if (writer != null) {
            try {
                writer.write(message + "\n");
                writer.flush();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
