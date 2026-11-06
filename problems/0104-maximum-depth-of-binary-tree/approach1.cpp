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
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0; // an empty tree has depth 0 // @viz empty
        int depth = 0; // @viz init
        std::queue<TreeNode*> queue; // @viz init
        queue.push(root); // @viz init
        while (!queue.empty()) { // one round per level // @viz loop
            ++depth; // @viz level
            size_t n = queue.size(); // exactly this level's nodes are in the queue // @viz level
            for (size_t k = 0; k < n; ++k) { // @viz level
                TreeNode* node = queue.front(); // @viz pop
                queue.pop(); // @viz pop
                if (node->left) queue.push(node->left); // @viz push
                if (node->right) queue.push(node->right); // @viz push
            }
        }
        return depth; // the number of levels // @viz return
    }
};
