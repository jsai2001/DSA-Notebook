import java.util.*;
class Solution {
    private List<List<Integer>> after;
    private int[] state, order;
    private int k;
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        after = new ArrayList<>(); // after[b] = courses that need b // @viz init
        for (int i = 0; i < numCourses; i++) after.add(new ArrayList<>()); // @viz init
        for (int[] p : prerequisites) after.get(p[1]).add(p[0]); // @viz init
        state = new int[numCourses]; // 0 = not visited, 1 = on the current path, 2 = finished // @viz init
        order = new int[numCourses]; // filled from the back as courses finish // @viz init
        k = numCourses; // @viz init
        for (int c = 0; c < numCourses; c++) // @viz loop
            if (dfs(c)) return new int[0]; // @viz loop
        return order; // reversed finish order: each course before everything that needs it // @viz return
    }
    private boolean dfs(int c) { // true if a cycle is found // @viz visit
        if (state[c] == 1) return true; // back on the current path: a cycle // @viz back
        if (state[c] == 2) return false; // @viz seen
        state[c] = 1; // @viz visit
        for (int next : after.get(c)) // @viz edge
            if (dfs(next)) return true; // @viz edge
        state[c] = 2; // @viz finish
        order[--k] = c; // @viz finish
        return false; // @viz finish
    }
}
