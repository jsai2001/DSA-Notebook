#include <vector>
class Solution {
public:
    std::vector<int> findRedundantConnection(std::vector<std::vector<int>>& edges) {
        const int n = edges.size(); // @viz init
        std::vector<std::vector<int>> adj(n + 1); // the graph so far // @viz init
        for (auto& e : edges) { // add the edges in order // @viz edge
            int a = e[0], b = e[1]; // @viz edge
            std::vector<char> seen(n + 1, 0); // before adding a-b: is b already reachable from a? // @viz search
            std::vector<int> stack{a}; // @viz search
            seen[a] = 1; // @viz search
            while (!stack.empty()) { // @viz search
                int u = stack.back(); // @viz search
                stack.pop_back(); // @viz search
                for (int v : adj[u]) { // @viz search
                    if (!seen[v]) { // @viz search
                        seen[v] = 1; // @viz search
                        stack.push_back(v); // @viz search
                    }
                }
            }
            if (seen[b]) return e; // yes: a-b would close a cycle, and it's the last edge of that cycle // @viz found
            adj[a].push_back(b); // @viz add
            adj[b].push_back(a); // @viz add
        }
        return {}; // not reached
    }
};
