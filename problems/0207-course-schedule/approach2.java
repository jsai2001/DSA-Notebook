import java.util.*;
class Solution {
    private List<List<Integer>> after;
    private int[] state;
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        after = new ArrayList<>(); // after[b] = courses that need b // @viz init
        for (int i = 0; i < numCourses; i++) after.add(new ArrayList<>()); // @viz init
        for (int[] p : prerequisites) after.get(p[1]).add(p[0]); // @viz init
        state = new int[numCourses]; // 0 = not visited, 1 = on the current path, 2 = finished, no cycle // @viz init
        for (int c = 0; c < numCourses; c++) // @viz return
            if (hasCycle(c)) return false; // @viz return
        return true; // @viz return
    }
    private boolean hasCycle(int c) { // @viz visit
        if (state[c] == 1) return true; // back to a course still on the path: a cycle // @viz back
        if (state[c] == 2) return false; // already checked // @viz seen
        state[c] = 1; // @viz visit
        for (int next : after.get(c)) // @viz edge
            if (hasCycle(next)) return true; // @viz edge
        state[c] = 2; // every path from c is cycle-free // @viz finish
        return false; // @viz finish
    }
}
