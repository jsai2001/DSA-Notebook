/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
#include <queue>
#include <utility>
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        std::queue<std::pair<TreeNode*, TreeNode*>> queue; // pairs of nodes at the same spot in both trees // @viz init
        queue.push({p, q}); // @viz init
        while (!queue.empty()) { // @viz loop
            auto [a, b] = queue.front(); // @viz loop
            queue.pop(); // @viz loop
            if (!a && !b) continue; // both missing: fine // @viz both
            if (!a || !b || a->val != b->val) return false; // one missing, or different values // @viz diff
            queue.push({a->left, b->left}); // @viz push
            queue.push({a->right, b->right}); // @viz push
        }
        return true; // every pair matched // @viz return
    }
};
