class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] left = new int[26]; // how many of each letter are still to run // @viz init
        for (char t : tasks) left[t - 'A']++; // @viz init
        int[] ready = new int[26]; // the first time each letter may run again // @viz init
        int time = 0, remaining = tasks.length; // @viz init
        while (remaining > 0) { // one loop per time unit // @viz tick
            int pick = -1; // @viz pick
            for (int c = 0; c < 26; c++) // of the letters allowed now, the one with the most left // @viz pick
                if (left[c] > 0 && ready[c] <= time && (pick < 0 || left[c] > left[pick])) pick = c; // @viz pick
            if (pick >= 0) { // run it, then it must wait n units // @viz run
                left[pick]--; // @viz run
                ready[pick] = time + n + 1; // @viz run
                remaining--; // @viz run
            }
            time++; // nothing allowed: this unit is idle // @viz idle
        }
        return time; // @viz return
    }
}
