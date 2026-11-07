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
    std::vector<int> rightSideView(TreeNode* root) {
        if (!root) return {}; // @viz empty
        std::vector<int> res; // @viz init
        std::queue<TreeNode*> queue; // @viz init
        queue.push(root); // @viz init
        while (!queue.empty()) { // @viz level
            const int size = queue.size(); // exactly one level is in the queue // @viz level
            for (int k = 0; k < size; ++k) { // @viz pop
                TreeNode* node = queue.front(); // @viz pop
                queue.pop(); // @viz pop
                if (k == size - 1) res.push_back(node->val); // the last node of the level is the one seen from the right // @viz last
                if (node->left) queue.push(node->left); // @viz push
                if (node->right) queue.push(node->right); // @viz push
            }
        }
        return res; // @viz return
    }
};
