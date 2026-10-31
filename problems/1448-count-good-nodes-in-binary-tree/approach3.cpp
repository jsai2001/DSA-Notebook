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
#include <algorithm>
#include <initializer_list>
#include <queue>
#include <utility>
class Solution {
public:
    int goodNodes(TreeNode* root) {
        int count = 0; // @viz init
        std::queue<std::pair<TreeNode*, int>> q; // (node, largest value above it) // @viz init
        q.push({root, root->val}); // @viz init
        while (!q.empty()) { // @viz loop
            auto [node, best] = q.front(); // @viz pop
            q.pop(); // @viz pop
            if (node->val >= best) { // @viz check
                count++; // @viz good
            }
            best = std::max(best, node->val); // @viz update
            for (TreeNode* child : {node->left, node->right}) { // @viz push
                if (child) q.push({child, best}); // @viz push
            }
        }
        return count; // @viz return
    }
};
