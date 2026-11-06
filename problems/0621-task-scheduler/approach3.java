class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] counts = new int[26]; // @viz count
        for (char t : tasks) counts[t - 'A']++; // @viz count
        int most = 0; // the most frequent task runs this many times // @viz count
        for (int c : counts) most = Math.max(most, c); // @viz count
        int tied = 0; // how many tasks share that count // @viz count
        for (int c : counts) if (c == most) tied++; // @viz count
        // The most frequent tasks need most - 1 full blocks of n + 1 units, then one last block of size tied.
        int frame = (most - 1) * (n + 1) + tied; // @viz frame
        return Math.max(frame, tasks.length); // with many kinds of task the gaps all fill, and no idle is needed // @viz return
    }
}
