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
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> levelOrder(TreeNode* root) {
        if (!root) return {}; // an empty tree has no levels: [], not [[]] // @viz empty
        std::vector<std::vector<int>> result; // @viz init
        std::queue<TreeNode*> queue; // @viz init
        queue.push(root); // @viz init
        while (!queue.empty()) { // @viz loop
            std::vector<int> level; // @viz loop
            size_t n = queue.size(); // exactly the nodes of this level are in the queue now // @viz size
            for (size_t k = 0; k < n; ++k) { // @viz size
                TreeNode* node = queue.front(); // @viz pop
                queue.pop(); // @viz pop
                level.push_back(node->val); // @viz pop
                if (node->left) queue.push(node->left); // their children go to the back: the next level // @viz push
                if (node->right) queue.push(node->right); // @viz push
            }
            result.push_back(level); // @viz done
        }
        return result; // @viz return
    }
};
